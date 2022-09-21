describe('When is the user s turn', () => {

    beforeEach(() => {
        localStorage.setItem("username", "player");
        cy.task('connect', 'player');
        cy.task('connect', 'Ghost');
        cy.wait(300);
        
        cy.visit('http://localhost:3000/game');
        
        cy.url().should('include', '/game');
        
        cy.findByText('Ghost').should('be.visible');
    })

    it('should show the game board', () => {
        cy.findByTestId('game-board').should('exist');
        
        cy.findByText("Selecciona el palo:")
        cy.findByTestId("selector-dice-suit").select("5")
        
        cy.findByText("Especifica el número:")
        cy.findByTestId("input-dice-number").type("6")
        
        cy.findByText("Apostar").click()
        
        cy.findByTestId('game-board').should('not.exist');

        cy.findByText("Turno actual del jugador: Ghost")
    })

    // TODO: Show the dices
})