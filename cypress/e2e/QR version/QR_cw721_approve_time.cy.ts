
/*scenario:
4,5,6, approve-time
4-burn from
5-revoke
6-check expiration
*/

describe('CW721 Approv time', () => {
    it('cw721 approvev time', () => {
        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.walletConnectViaQR()
        cy.visit(Cypress.env('URL') + '/cw721/execute')

        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Approve').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        // input token ID-4
        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('4')

        // time setting
        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
            .click()

        cy.wait(1000)
        cy.contains('Set the Expiration date and time').should('be.visible')
            .get('button').contains('button', 'Set').click()

        cy.wait(1000)

        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-approve-time-transaction-completed')

        // close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()

        // input token ID-5
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('5')

        //set expiration date and time
        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
            .click()

        cy.wait(1000)
        cy.contains('Set the Expiration date and time').should('be.visible')
            .get('button').contains('button', 'Set').click()

        cy.wait(1000)

        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-approve-time-transaction-completed')

        // close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()

        // input token ID-6
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('6')

        //set expiration date and time
        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
            .click()

        cy.wait(1000)
        cy.contains('Set the Expiration date and time').should('be.visible')
            .get('button').contains('button', 'Set').click()

        cy.wait(1000)
        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-approve-time-transaction-completed')

    })

})

describe('burn from - 4', () => {
    it('burn from - 4', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        //login as the wallet that approved token ID-4
        cy.walletConnectViaQR() //input the wallet address to be approved nft id 4
        cy.visit(Cypress.env('URL') + '/cw721/execute')

        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        cy.get('[role="option"]').contains('Burn').click()
        cy.wait(1000)

        //input token ID-4
        cy.get('input[type="string"][placeholder="Input the numbers : You can input multiple numbers separated by commas (,)"]')
            .clear()
            .type('4').blur()

        cy.wait(1000)
        cy.get('button').contains('Burn')
            .click()

        // QR authentication
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-burn-transaction-completed')

    })
})


describe('revoke -5', () => {
    it('revoke - 5', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        //login as the wallet that approved token ID-5
        cy.walletConnectViaQR() //input the wallet address to be approved nft id 5
        cy.visit(Cypress.env('URL') + '/cw721/execute')

        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Revoke').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        //input token ID-5
        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('5')

        cy.wait(1000)
        cy.get('button').contains('Revoke')
            .should('not.be.disabled')
            .click()

        // verification with mnemonic
        cy.wait(1000)
        cy.QR_authentication()

        cy.wait(10000)
        cy.screenshot('cw721-revoke-transaction-completed')

    })
})


//4-check owner
//5-check history(should be empty)
//6-check expiration