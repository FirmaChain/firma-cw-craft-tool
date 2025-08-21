describe('create cw721 basic contract', () => {
    it('create cw721 basic contract', () => {
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')

        // NFT contract name 
        cy.get('input[type="string"][placeholder="ex) MY CW NFT Contract"]')
            .clear()
            .type('My NFT Contract Name basic'+Cypress.env('DATE'))

        // NFT contract symbol 
        cy.get('input[placeholder="ex) MCT, FCT"]')
            .clear()
            .type('MNCN basic')

        cy.get('input[placeholder="ex) Event reward contract"]')
            .clear()
            .type('My NFT Contract Label basic'+Cypress.env('DATE'))

        cy.wait(1000)
        cy.get('span[class="button-text"]').contains('Instantiate')
            .should('not.be.disabled')
            .click()

        //QR authentication
        cy.QR_authentication()

        cy.wait(8000)
        cy.screenshot('create cw721 basic contract')
        
    })
})


describe('create cw721 advanced contract', () => {
    it('create cw721 advanced contract', () => {
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')

        // select advanced contract toggle
        cy.contains('div', 'ADVANCED')
            .should('be.visible')
            .click()

        // input NFT contract name 
        cy.get('input[type="string"][placeholder="ex) MY CW NFT Contract"]')
            .clear()
            .type('My NFT Contract Name advanced'+Cypress.env('DATE'))

        // input NFT contract symbol 
        cy.get('input[placeholder="ex) MCT, FCT"]')
            .clear()
            .type('MNCN advanced')

        // input admin address 
        cy.contains('Admin Address').get('input[type="string"][placeholder="Input wallet Address"]').eq(0)
            .clear()
            .type(Cypress.env('ADDRESS_5'))

        // input minter address
        cy.get('input[type="string"][placeholder="Input wallet Address"]').eq(1)
            .clear()
            .type(Cypress.env('ADDRESS_5'))

        // input the contract label
        cy.get('input[placeholder="ex) Event reward contract"]')
            .clear()
            .type('My NFT Contract Label advanced'+Cypress.env('DATE'))

        // click Instantiate button
        cy.wait(1000)
        cy.get('span[class="button-text"]').contains('Instantiate')
            .should('not.be.disabled')
            .click()

        //QR authentication
        cy.QR_authentication()

        cy.wait(8000)
        cy.screenshot('create cw721 advanced contract')
    })
})
