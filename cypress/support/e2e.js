import './commands';
import 'cypress-plugin-visual-regression-diff/dist/support';

// Global beforeEach hook to clear state
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Global afterEach hook to log test failures
afterEach(function () {
  if (this.currentTest.state === 'failed') {
    cy.task('log', `[Cypress Failure] "${this.currentTest.fullTitle()}" failed.`);
  }
});

// Ignore React hydration mismatch exceptions which do not impact functional correctness
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Minified React error #418') || 
    err.message.includes('Minified React error #423') ||
    err.message.includes('hydration') ||
    err.message.includes('hydrating')
  ) {
    return false;
  }
  // Let other actual runtime exceptions fail the tests
});
