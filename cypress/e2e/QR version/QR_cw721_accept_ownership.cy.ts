describe('cw721 accept ownership', () => {
    it('cw721 accept ownership', () => {
        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/cw721/execute')

        // search on execute page
        cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))

        cy.wait(5000)
        cy.get('span[class="highlight"]')
            .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
            .click()

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Update Ownership Accept').click()
        cy.wait(1000)
        
        cy.get('button').contains('Accept').click()
        // QR authentication
        cy.QR_authentication()
        cy.wait(10000)
        cy.screenshot('cw721-accept-ownership-transaction-completed')
        
        //search check
        cy.get('button').contains('Search').parent().click()
        cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
            .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
        cy.get('span[class="highlight"]')
            .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
            .click()
        cy.wait(1000)
        
        cy.contains('Minter').scrollIntoView()
        cy.wait(1000) // wait for scroll animation
    
    
        // take screenshot
        cy.screenshot('cw721-accept-ownership')
        //My NFT Contract - check directly
    })
})