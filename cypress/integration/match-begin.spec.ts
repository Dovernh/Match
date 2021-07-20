describe('Match begin', () => {
    beforeEach(() => {
      cy.visit('/match-begin').contains('Are you ready for this?');
    });

    it('Should contain 3 faces', () => {
      cy.get('.faces i').should('have.length', 3);
      cy.get('.begin button').should('be.disabled').contains('Begin').click();
      cy.url().should('include', 'match-begin');
    })

    it('Should have enabled Begin button', () => {
      cy.get('.faces i').eq(0).click().should('have.class', 'selected');
      cy.get('.begin button').should('not.be.disabled').contains('Begin').click();
      cy.url().should('not.include', 'match-begin').should('include', 'match');
    })
});