describe('When a user access the game', () => {
  const name = `player_${Cypress._.random(1000)}`

  it('should see the players list', () => {
    cy.task('connect', 'Ghost')
    cy.wait(300);

    cy.visit('http://localhost:3000')

    cy.findByText('Introduce nombre de usuario').should('be.visible')
    cy.findByTestId('username-input').type(name)
    cy.findByText("Jugar").click()

    cy.url().should('include', '/game')

    cy.findByText(name).should('be.visible')
    cy.findByText('Ghost').should('be.visible')
  })
})