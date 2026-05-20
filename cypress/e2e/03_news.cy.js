describe('News & Transmissions', () => {
  beforeEach(() => {
    cy.visit('/news');
  });

  it('news page loads with featured post', () => {
    // Assert page heading visible
    cy.get('h1').should('be.visible');
    
    // Assert at least one post card exists
    cy.get('article.post').should('exist');
    
    // Assert featured post has a title and read time
    cy.get('article.featured').within(() => {
      cy.get('h2').should('exist').and('be.visible');
      cy.contains(/read/i).should('exist');
    });
  });

  it('data-driven: category filters work', () => {
    const categories = ['Patch notes', 'Dev logs', 'Events', 'Lore drops', 'Community'];
    
    categories.forEach((category) => {
      cy.filterNews(category);
      
      // Assert at least one card is visible or empty state message shown
      cy.get('body').then(($body) => {
        if ($body.find('article.post').length > 0) {
          cy.get('article.post').should('be.visible');
        } else {
          cy.contains(/No transmissions match/i).should('be.visible');
        }
      });
    });
  });

  it('load more button appends posts', () => {
    // Count initial post cards
    cy.get('article.post').then(($initialPosts) => {
      const countBefore = $initialPosts.length;
      
      // Find and click "Load" button
      cy.contains('button', /Load/i).should('be.visible').click();
      
      // Wait 1000ms for content to settle
      cy.wait(1000);
      
      // Assert post card count increased
      cy.get('article.post').should('have.length.greaterThan', countBefore);
    });
  });

  it('each post card has required fields', () => {
    // Get first post card and assert title, date, and read link exist within it
    cy.get('article.post').first().within(() => {
      cy.get('h3').should('exist');
      cy.contains(/\d+/).should('exist'); // date or read time
      cy.contains(/Read/i).should('exist'); // read link
    });
  });

  it('All filter shows all posts', () => {
    cy.filterNews('All');
    
    // Assert multiple post cards visible (at least 3)
    cy.get('article.post').should('have.length.at.least', 3);
  });
});
