describe('cw20 allowance_time', () => {

    it('cw20 increase allowance_time', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/execute')

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Increase Allowance from React Select options
        cy.get('[role="option"]').contains('Increase Allowance').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"] ')
        .clear()
        .type('2000').blur()

        //set expiration date and time
        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
        .click()

        cy.contains('Set the Expiration date and time').should('be.visible')
        .get('button').contains('button','Set').click()

        cy.wait(1000)
        cy.get('button').contains('Increase Allowance').parent()
        .should('not.be.disabled')
        .click()
        
        cy.wait(1000)
        
        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000)
        cy.screenshot('increase allowance_block-transaction-completed')
    
    })

    it('cw20 burn from to check the allowance-time', () => {
        cy.visit(Cypress.env('URL') + '/execute');
        cy.walletConnectViaQR();//login with the wallet address that has the allowance-time
        cy.visit(Cypress.env('URL') + '/execute');

        // search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));

        // select Burn From from dropdown
        cy.get('span[class="typo"]').contains('Select').click();
        cy.wait(1000);

        // select Burn From from React Select options
        cy.get('[role="option"]').contains('Burn From').click();

        // input wallet address
        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
            .clear()
            .type(Cypress.env('ADDRESS_5'));

        // input amount to burn
        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('50');

        // click Burn button
        cy.get('div[class="button-text"]').contains('Burn').parent()
            .should('not.be.disabled')
            .click();

        cy.wait(1000);

        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000);
        cy.screenshot('burn from-transaction-completed');
    });

    it('cw20 decrease allowance_time', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/execute')

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Increase Allowance from React Select options
        cy.get('[role="option"]').contains('Increase Allowance').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('200')

        //set expiration date and time
        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
        .click()

        cy.contains('Set the Expiration date and time').should('be.visible')
        .get('button').contains('button','Set').click()

        cy.wait(1000)
        cy.get('button').contains('Increase Allowance').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        
        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000)
        cy.screenshot('increase allowance_time-transaction-completed')
        
    })
})