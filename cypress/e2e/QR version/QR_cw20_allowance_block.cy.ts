describe('cw20 allowance_block', () => {
    it('cw20 allowance_block', () => {
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
        cy.get('input[type="text"][placeholder="ex) 7216240"]')
        .clear()
        .type(Cypress.env('BLOCK_HEIGHT'))

        cy.wait(1000)
        cy.get('button').contains('Increase Allowance').parent()
        .should('not.be.disabled')
        .click()
        
        cy.wait(1000)
        
        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000)
        cy.screenshot('increase allowance-block')
    })
    
    //search on search page
    it('cw20 searching allowance_block', () => {
        cy.visit(Cypress.env('URL') + '/search')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/search')

        //search the contract address
        cy.get('input[type="text"][placeholder="Search by Token Name / Symbol / Label / Address"]')
        .clear()
        .type(Cypress.env('CW20_CONTRACT_ADDRESS'))

        //wait for 5 seconds
        cy.wait(5000)

        //click on the contract address
        cy.contains(Cypress.env('CW20_CONTRACT_ADDRESS')).should('be.visible').eq(1)
        .click()

        cy.wait(5000)

        //search the wallet address that has the allowance-block
        cy.get('input[type="text"][placeholder="Search by CW20 Wallet Address"]')
        .eq(1)
        .scrollIntoView({block: 'center', inline: 'nearest'})
        .should('be.visible')
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('button').contains('Search').click()
        cy.wait(5000)
        cy.screenshot('searching-decrease allowance_block')
    })

    //transfer from
    it('cw20 decrease transfer from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.walletConnectViaQR()//login with the wallet address that has the allowance-block
        cy.visit(Cypress.env('URL') + '/execute')

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Transfer From from React Select options
        cy.get('[role="option"]').contains('Transfer From').click()

        cy.get('input[type="string"][placeholder="Input address"]').eq(1)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('40')

        cy.get('div[class="button-text"]').contains('Transfer').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)

        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000)
        cy.screenshot('transfer from-transaction-completed')
    })

    it('cw20 decrease allowance_block', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/execute')

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // select Decrease Allowance from React Select options
        cy.get('[role="option"]').contains('Decrease Allowance').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('200')

        cy.get('input[type="text"][placeholder="ex) 7216240"]')
        .clear()
        .type(Cypress.env('BLOCK_HEIGHT'))

        cy.wait(1000)
        cy.get('button').contains('Decrease Allowance').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)

        //QR authentication
        cy.QR_authentication()

        // wait for 10 seconds and capture screen
        cy.wait(10000)
        cy.screenshot('decrease allowance_block')

    })

    it('cw20 decrease allowance_block', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/execute')

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
    })
})