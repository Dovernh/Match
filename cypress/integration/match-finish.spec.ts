describe('Match finish', () => {
    beforeEach(() => {
      cy.visit('/match-finish').contains('How do you think you did?');
    });

    it('Should contain 3 faces', () => {
      cy.get('.faces i').should('have.length', 3);
      cy.get('.begin button').should('be.disabled').contains('Finish').click();
      cy.url().should('include', 'match-finish');
    })

    it('Should have enabled Begin button', () => {
      cy.get('.faces i').eq(0).click().should('have.class', 'selected');
      cy.get('.begin button').should('not.be.disabled').contains('Finish').click();
      //cy.url().should('not.include', 'match-finish').should('include', 'match'); TODO
    })
});