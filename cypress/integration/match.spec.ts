describe('Match test', () => {
  beforeEach(() => {
    cy.visit('match').contains('Time');
  });

  it('Should select first word', () => {
    cy.get('.words')
      .children()
      .should('have.length.gt', 0)
      .first()
      .click()
      .should('have.class', 'selected');
  });

  it('Should unselect first word if already selected', () => {
    cy.get('.words')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstWord');

    cy.get('@firstWord').click().should('have.class', 'selected');

    cy.get('@firstWord').click().should('not.have.class', 'selected');
  });

  it('Should assign first word to first definition', () => {
    cy.get('.words')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstWord')
      .click();

    cy.get('.defs')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstDef')
      .click()
      .find('.placeholder');

    cy.get('@firstWord').should('have.class', 'assigned');
  });

  it('Should unassign word and definition if already assigned when clicking definition', () => {
    cy.get('.words')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstWord')
      .click();

    cy.get('.defs')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstDef')
      .click()
      .click();

    cy.get('@firstDef').find('.placement').should('not.exist');

    cy.get('@firstWord').should('not.have.class', 'assigned');
  });

  it('Should unassign word and definition if already assigned when clicking word', () => {
    cy.get('.words')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstWord')
      .click();

    cy.get('.defs')
      .children()
      .should('have.length.gt', 0)
      .first()
      .as('firstDef')
      .click();

    cy.get('@firstWord').click().should('not.have.class', 'assigned');

    cy.get('@firstDef').find('.placement').should('not.exist');
  });

  it('Should show confirmation modal if submitted', () => {
    cy.get('button.submit')
      .contains('Submit')
      .click()
      .get('.cdk-overlay-pane')
      .contains('Confirm Submission');
  });

  it('Should navigate if ok selected on modal', () => {
    cy.get('button.submit')
      .contains('Submit')
      .click()
      .get('.cdk-overlay-pane')
      .contains('Confirm Submission')
      .as('confirm-modal');

    cy.get('@confirm-modal')
      .get('button:contains("Ok")')
      .click()
      .url()
      .should('includes', 'match-finish');
  });

  it('Should not navigate if ok not selected on modal', () => {
    cy.get('button.submit')
      .contains('Submit')
      .click()
      .get('.cdk-overlay-pane')
      .contains('Confirm Submission')
      .as('confirm-modal');

    cy.get('@confirm-modal').get('button:contains("Cancel")').click();

    cy.get('.count-down');
  });
});
