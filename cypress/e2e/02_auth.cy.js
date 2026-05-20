describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('displays sign in form correctly', () => {
    // Assert email input, password input, and submit button are all visible
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    
    // Assert Google OAuth button visible
    cy.contains('button', /Google/i).should('be.visible');
    
    // Assert "Sign Up" tab visible
    cy.contains('button', 'Sign Up').should('be.visible');
  });

  it('data-driven: valid login credentials', () => {
    cy.fixture('users.json').then((data) => {
      // We take the first valid user to test in E2E (or loop if needed, but since it's a redirection check, we loop)
      data.validUsers.forEach((user) => {
        cy.visit('/auth');
        cy.login(user.email, user.password);
        cy.url().should('include', user.expectedRedirect);
      });
    });
  });

  it('data-driven: invalid credentials show error', () => {
    cy.fixture('users.json').then((data) => {
      // Loop over invalid users (excluding completely empty inputs which are tested separately)
      data.invalidUsers.forEach((user) => {
        if (user.email !== '' || user.password !== '') {
          cy.visit('/auth');
          if (user.email) cy.get('input[type="email"]').clear().type(user.email);
          if (user.password) cy.get('input[type="password"]').clear().type(user.password);
          cy.get('button[type="submit"]').click();
          cy.get('.auth-error').should('be.visible').and('contain', user.expectedError);
        }
      });
    });
  });

  it('empty form submission stays on auth page', () => {
    // Click submit without typing anything
    cy.get('button[type="submit"]').click();
    
    // Assert URL still includes /auth
    cy.url().should('include', '/auth');
  });

  it('sign up tab switches form', () => {
    // Find and click the Sign Up tab
    cy.contains('button', 'Sign Up').click();
    
    // Assert form updates (look for confirm password field)
    cy.get('input[id="auth-confirm"]').should('be.visible');
  });

  it('token bypass: access community without form login', () => {
    // Session token bypass programmatic login
    cy.loginViaToken();
    
    // Go to community page
    cy.visit('/community');
    
    // Assert Sign In button is NOT visible
    cy.contains('a', /Sign In|Sign in/i).should('not.exist');
    
    // Assert page content loads (heading visible)
    cy.get('h1, h2').first().should('be.visible');
  });
});
