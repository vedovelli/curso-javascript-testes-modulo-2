declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestId(): Chainable<any>;
    addToCart(): Chainable<any>;
  }
}
