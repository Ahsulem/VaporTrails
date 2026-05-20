describe('Visual Regression Testing', () => {
  it('home page hero matches baseline', () => {
    cy.visit('/');
    // Wait for animations, dynamic text glitches, and videos to settle
    cy.wait(1500);
    
    // Take and compare hero baseline with high tolerance for animations/glitches
    cy.matchImage({ 
      title: 'home-hero',
      maxDiffThreshold: 0.3
    });
  });

  it('auth page matches baseline', () => {
    cy.visit('/auth');
    cy.wait(500);
    
    // Take and compare auth baseline
    cy.matchImage({ 
      title: 'auth-page',
      maxDiffThreshold: 0.1
    });
  });

  it('news page matches baseline', () => {
    cy.visit('/news');
    cy.wait(1000);
    
    // Take and compare news baseline
    cy.matchImage({ 
      title: 'news-page',
      maxDiffThreshold: 0.1
    });
  });

  it('community page matches baseline', () => {
    cy.visit('/community');
    cy.get('.forum-cats').scrollIntoView();
    cy.wait(1000);
    
    // Take and compare community baseline
    cy.matchImage({ 
      title: 'community-page',
      maxDiffThreshold: 0.1
    });
  });

  it('auth page sign-up tab matches baseline', () => {
    cy.visit('/auth');
    
    // Click the Sign Up tab to toggle state
    cy.contains('button', 'Sign Up').click();
    cy.wait(300);
    
    // Take and compare toggled auth tab baseline
    cy.matchImage({ 
      title: 'auth-signup-tab',
      maxDiffThreshold: 0.1
    });
  });
});
