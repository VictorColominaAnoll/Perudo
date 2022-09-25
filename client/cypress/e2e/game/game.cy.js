describe('When is the user s turn', () => {

    beforeEach(() => {
        cy.task('reset')

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
    });

    it('should show and hide the game board depending on the players turn', () => {
        cy.findByText("Selecciona el palo:")
        cy.findByTestId("selector-dice-suit").select("5")

        cy.findByText("Especifica el número:")
        cy.findByTestId("input-dice-number").type("6")

        cy.findByText("Apostar").click()

        cy.findByTestId('game-board').should('not.exist');

        cy.findByText("Turno actual del jugador: Ghost")

        cy.task('ghostTurn')

        cy.findByTestId('game-board').should('exist');
    });

    it('should show the players dices', () => {
        cy.findByTestId("player-dices").should('exist')

        cy.get("#dice-1").should('be.visible');
        cy.get("#dice-2").should('be.visible');
        cy.get("#dice-3").should('be.visible');
        cy.get("#dice-4").should('be.visible');
        cy.get("#dice-5").should('be.visible');
        
        cy.get("#dice-0").should('not.exist');
        cy.get("#dice-6").should('not.exist');
    })

    it.only('should show the REJECTION button if round > 1', () => {
        cy.findByText('OBJECTION!').should('not.exist')
        
        cy.findByTestId("selector-dice-suit").select("5");
        cy.findByTestId("input-dice-number").type("6");
        cy.findByText("Apostar").click();
        cy.task('ghostTurn');

        cy.findByText('OBJECTION!').click()
    })

})