describe('Navigation & Page Loads', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('home page loads with correct hero content', () => {
    // Assert title contains Vapor
    cy.title().should('include', 'Vapor');
    
    // Assert the hero heading exists and contains 'Vapor'
    cy.get('h1.display').should('exist').and('contain', 'Vapor');
    
    // Assert Sign In and Play buttons are visible
    cy.contains('a', /Sign In|Sign in/i).should('be.visible');
    cy.contains('a', /Play|Play the game/i).should('be.visible');
  });

  it('all nav links are present', () => {
    // Use custom command cy.verifyNavLinks()
    cy.verifyNavLinks();
  });

  it('navigates to News page', () => {
    cy.navigateTo('news');
    // Assert h1 or heading visible on page
    cy.get('h1, h2').first().should('be.visible');
  });

  it('navigates to Lore page', () => {
    cy.navigateTo('lore');
    cy.url().should('include', 'lore');
  });

  it('navigates to Community page', () => {
    cy.navigateTo('community');
    cy.url().should('include', 'community');
  });

  it('navigates to Auth page', () => {
    cy.navigateTo('auth');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('hover trigger on nav items does not break layout', () => {
    // Get each nav link, trigger mouseover on each, assert nav is still visible
    cy.get('nav .links a').each(($el) => {
      cy.wrap($el).trigger('mouseover');
      cy.get('nav').should('be.visible');
    });
  });

  it('footer links are present', () => {
    // Scroll to bottom first
    cy.scrollTo('bottom');
    
    // Assert footer text/links exist
    cy.contains(/Privacy/i).should('exist');
    cy.contains(/Terms/i).should('exist');
  });
});
