// 1. cy.login(email, password)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/auth');
  
  // Find email input by type or placeholder
  cy.get('input[type="email"], [placeholder*="@"]').first().clear().type(email);
  
  // Find password input by type
  cy.get('input[type="password"]').first().clear().type(password);
  
  // Click submit button (contains "Access terminal")
  cy.contains('button', 'Access terminal').click();
  
  // Assert URL includes /
  cy.url().should('include', '/');
});

// 2. cy.loginViaToken()
Cypress.Commands.add('loginViaToken', () => {
  cy.request({
    method: 'POST',
    url: 'https://fhgqgsbaicnhaydqvbbo.supabase.co/auth/v1/token?grant_type=password',
    headers: {
      apikey: Cypress.env('SUPABASE_KEY'),
      'Content-Type': 'application/json',
    },
    body: {
      email: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD'),
    },
  }).then((response) => {
    const value = JSON.stringify(response.body);
    cy.setCookie('sb-fhgqgsbaicnhaydqvbbo-auth-token', value);
    cy.setCookie('sb-fhgqgsbaicnhaydqvbbo-auth-token.0', value);
  });

  cy.visit('/forum/new');
  cy.url().should('not.include', '/auth');
});

// 3. cy.navigateTo(pageName)
Cypress.Commands.add('navigateTo', (pageName) => {
  // Find a nav link whose href or text contains the pageName (case insensitive)
  cy.get('nav a').then(($links) => {
    const matched = $links.filter((i, el) => {
      const href = el.getAttribute('href') || '';
      const text = el.textContent || '';
      return href.toLowerCase().includes(pageName.toLowerCase()) || 
             text.toLowerCase().includes(pageName.toLowerCase());
    });
    if (matched.length > 0) {
      cy.wrap(matched.first()).click({ force: true });
    } else {
      throw new Error(`Could not find navigation link for: ${pageName}`);
    }
  });
  cy.url().should('include', pageName.toLowerCase());
});

// 4. cy.filterNews(category)
Cypress.Commands.add('filterNews', (category) => {
  // Find the filter tab that contains the category text and click it
  cy.get('.chips, .filterbar').contains('button, a, span', new RegExp('^' + category + '$', 'i')).click({ force: true });
  
  // Assert the tab has active styling (check for 'active', 'aria-selected', or high-contrast colors/classes like 'on')
  cy.get('.chips, .filterbar').contains('button, a, span', new RegExp('^' + category + '$', 'i')).should(($el) => {
    const isActive = [...$el].some(el => {
      const className = el.getAttribute('class') || '';
      const ariaSelected = el.getAttribute('aria-selected') || '';
      return className.split(/\s+/).includes('on') || 
             className.split(/\s+/).includes('active') || 
             className.includes('bg-') || 
             ariaSelected === 'true';
    });
    expect(isActive).to.be.true;
  });
  
  // Wait 500ms for content to settle
  cy.wait(500);
});

// 5. cy.submitThread(title, content)
Cypress.Commands.add('submitThread', (title, content) => {
  cy.visit('/forum/new');
  cy.wait(1500);
  cy.get('#thread-title').clear().type(title);
  cy.wait(500);
  cy.get('#thread-content').clear().type(content);
  cy.wait(500);
  cy.screenshot('before-submit');
  cy.get('button.btn.primary.forum-submit').should('not.be.disabled').click();
  cy.wait(1000);
  cy.url({ timeout: 20000 }).should('not.include', '/new');
});

// 6. cy.verifyNavLinks()
Cypress.Commands.add('verifyNavLinks', () => {
  // Assert all 4 nav links are visible: Home, News, Lore, Community
  cy.get('nav').within(() => {
    cy.contains('a', 'Home').should('be.visible');
    cy.contains('a', 'News').should('be.visible');
    cy.contains('a', 'Lore').should('be.visible');
    cy.contains('a', 'Community').should('be.visible');
    
    // Assert Sign In link is visible
    cy.contains('a', /Sign In|Sign in/i).should('be.visible');
  });
});
