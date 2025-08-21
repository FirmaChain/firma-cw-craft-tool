
/*scenario:
7,8 approve-forever
7-burn from
8-revoke
*/

describe('CW721 Approv forever', () => {

    it('cw721 approve-forever', () => {
        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.walletConnectViaQR()

        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Approve').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_6'))

        // input token ID-7
        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('7')

        // click the expire time - forever 
        cy.get('button').contains('Forever').click()

        cy.get('button').should('not.be.disabled').contains('Approve').click()
        cy.wait(1000)

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-approve-forever-transaction-completed')

        cy.get('button').contains('Confirm').click()

        // input wallet address to be approved token ID-8
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_6'))
            .blur()

        // input token ID-8
        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('8')

        // click Forever button
        cy.get('button').contains('Forever').click()

        cy.get('button').should('not.be.disabled').contains('Approve').click()
        cy.wait(1000)

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-approve-forever-transaction-completed')

    })
})

describe('burn from - 7', () => {
    it('burn from - 7', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.walletConnectViaQR() //input the wallet address to be approved nft id 7
        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Burn').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input the numbers : You can input multiple numbers separated by commas (,)"]')
            .clear()
            .type('7')

        cy.wait(1000)
        cy.get('button').contains('Burn')
            .should('not.be.disabled')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-burn-transaction-completed')

    })
})


describe('revoke - 8', () => {
    it('revoke - 8', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.walletConnectViaQR() //input the wallet address to be approved nft id 8
        
        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Revoke').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_6'))
            .blur()

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('8')

        cy.wait(1000)
        cy.get('button').contains('Revoke')
            .should('not.be.disabled')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-revoke-transaction-completed')

    })
})