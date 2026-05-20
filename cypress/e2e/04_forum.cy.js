describe('Forum & Thread Submission', () => {
  beforeEach(() => {
    // Authenticate via token for each test to preserve session
    cy.loginViaToken();
  });

  it('forum page loads with categories', () => {
    cy.visit('/community');
    cy.get('.forum-cats').scrollIntoView().should('be.visible');
    cy.contains('h4', 'Trail Routes').should('be.visible');
    cy.contains('h4', 'Garage Builds').should('be.visible');
    cy.contains('a', /New thread|New Thread/i).should('be.visible');
  });

  it('data-driven: submit multiple threads from fixture', () => {
    cy.fixture('threadData.json').then((data) => {
      data.threads.forEach((thread) => {
        cy.submitThread(thread.title, thread.content);
        
        // Go back to the forum page
        cy.visit('/forum');
        
        // Assert the new thread is visible in the feed
        cy.contains(thread.title).should('be.visible');
      });
    });
  });

  it('empty thread submission shows validation', () => {
    cy.visit('/forum/new');
    cy.contains('button', 'Submit Post').click();
    cy.url().should('include', '/forum/new');
  });

  it('submitted thread appears immediately without refresh', () => {
    cy.loginViaToken();
    const title = 'Trail test ' + Date.now();
    cy.submitThread(title, 'Test content for immediate visibility');
    cy.contains(title, { timeout: 10000 }).should('be.visible');
    cy.wait(4000);
  });

  it('forum category sections display correct thread counts or labels', () => {
    cy.visit('/community');
    cy.get('.forum-cats').scrollIntoView();
    cy.wait(500);

    const categories = [
      'Trail Routes',
      'Garage Builds',
      'World Lore',
      'Events',
      'Feedback',
      'Off-Grid'
    ];

    categories.forEach((cat) => {
      cy.contains('h4', cat).should('be.visible');
      cy.contains('h4', cat)
        .parents('.forum-cat')
        .contains(/threads/i)
        .should('be.visible');
    });
  });
});
