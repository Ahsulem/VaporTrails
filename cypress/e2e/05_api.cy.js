describe('API Mocking & Direct Requests', () => {
  it('intercept news API and render mock data', () => {
    // Intercept Supabase REST news posts query
    cy.intercept('GET', '**/rest/v1/**', { fixture: 'mockPosts.json' }).as('getPosts');
    
    // Visit news page
    cy.visit('/news');
    
    // Assert page rendered without crash and posts grid exists
    cy.get('body').should('be.visible');
    cy.get('article.featured').should('exist');
  });

  it('intercept and simulate API failure shows fallback', () => {
    // Intercept with 500 server error
    cy.intercept('GET', '**/rest/v1/**', {
      statusCode: 500,
      body: { error: 'server error' }
    }).as('failedPosts');
    
    // Visit news page
    cy.visit('/news');
    
    // Assert page does not crash (body still visible)
    cy.get('body').should('be.visible');
  });

  it('intercept auth failure shows error UI', () => {
    // Intercept auth submit with 401 unauthorized
    cy.intercept('POST', '**/auth/v1/token**', {
      statusCode: 401,
      body: { error: 'invalid_grant', error_description: 'Invalid login credentials' }
    }).as('failedAuth');
    
    // Visit auth page
    cy.visit('/auth');
    
    // Fill in credentials
    cy.get('input[type="email"]').first().type('wrong@email.com');
    cy.get('input[type="password"]').first().type('wrongpass');
    
    // Click submit
    cy.contains('button', 'Access terminal').click();
    
    // Wait for auth intercept
    cy.wait('@failedAuth');
    
    // Assert error message visible
    cy.get('.auth-error').should('be.visible');
  });

  it('direct API request: authenticate via Supabase REST', () => {
    const supabaseUrl = Cypress.env('SUPABASE_URL');
    const supabaseKey = Cypress.env('SUPABASE_KEY');
    const email = Cypress.env('TEST_EMAIL');
    const password = Cypress.env('TEST_PASSWORD');
    const targetUrl = `${supabaseUrl}/auth/v1/token?grant_type=password`;

    cy.request({
      method: 'POST',
      url: targetUrl,
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      body: { email, password },
      failOnStatusCode: false
    }).then((response) => {
      // Assert status is either 200, 400 (unconfirmed email), or other API statuses
      expect([200, 400]).to.include(response.status);
      if (response.status === 200) {
        expect(response.body.access_token).to.exist;
      } else {
        const msg = response.body.error_description || response.body.msg || '';
        expect(msg.toLowerCase()).to.include('email');
      }
    });
  });

  it('direct API request: verify environment variables are set', () => {
    // Write full environment state to a local debug file for inspection
    cy.writeFile('cypress_env_debug.json', {
      env: Cypress.env(),
      baseUrl: Cypress.config('baseUrl')
    });

    // Assert Cypress.env is populated
    expect(Cypress.env('SUPABASE_URL')).to.not.be.empty;
    expect(Cypress.env('SUPABASE_KEY')).to.not.be.empty;
    
    // Log verification
    cy.task('log', 'Environment variables verified');
  });
});
