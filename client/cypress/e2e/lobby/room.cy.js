describe('When an admin wants to create a game', () => {
  // it('should be able to create a new game', () => {
  //     cy.visit("http://localhost:3000")
  // })

  it('sees the 2nd user join', () => {
    // the browser is the 1st user
    cy.visit('http://localhost:3000')

    // we need to wait a bit or the server sends the message super fast
    cy.wait(300)

    // connect to the server using 2nd user
    const secondName = 'Ghost'
    cy.task('connect', secondName)
    
    cy.contains('Ghost').should('be.visible')
  })
})