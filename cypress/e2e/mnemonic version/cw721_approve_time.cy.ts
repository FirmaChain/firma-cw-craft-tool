
/*
4,5,6, approve-time
4-burn from
5-revoke
6-check expiration
*/

describe('CW721 Approv time', () => {
    it('cw721 approvev time', () => {
        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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

        // verification with mnemonic
        cy.wait(1000)
        cy.contains('div', 'Approve')
            .get('input[type="password"][placeholder="Enter Password"]')
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'))
            .blur()

        cy.wait(3000)
        cy.get('button')
            .contains('div', 'Confirm')
            .click()

        cy.wait(10000)
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

        // verification with mnemonic
        cy.wait(1000)
        cy.contains('div', 'Approve')
            .get('input[type="password"][placeholder="Enter Password"]')
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'))
            .blur()

        cy.wait(3000)
        cy.get('button')
            .contains('div', 'Confirm')
            .click()

        cy.wait(10000)

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

        // verification with mnemonic
        cy.wait(1000)
        cy.contains('div', 'Approve')
            .get('input[type="password"][placeholder="Enter Password"]')
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'))
            .blur()

            cy.wait(3000)
        cy.get('button')
            .contains('div', 'Confirm')
            .click()

        cy.wait(10000)

        // close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()
    })

})

describe('burn from - 4', () => {
    it('burn from - 4', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        //login as the wallet that approved token ID-4
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_20'), Cypress.env('PASSWORD'))

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

        // verification with mnemonic   
        cy.wait(1000)
        cy.contains('div', 'Burn')
            .get('input[type="password"][placeholder="Enter Password"]')
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'))
            .blur()

        cy.wait(3000)
        cy.get('button')
            .contains('div', 'Confirm')
            .click()

        cy.wait(10000)  

    })
})


describe('revoke -5', () => {
    it('revoke - 5', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        //login as the wallet that approved token ID-5
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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
        cy.contains('div', 'Revoke')
            .get('input[type="password"][placeholder="Enter Password"]')
            .should('be.visible')
            .clear()
            .type(Cypress.env('PASSWORD'))
            .blur()

        cy.wait(3000)
        cy.get('button')
            .contains('div', 'Confirm')
            .click()

        cy.wait(10000)
    })
})


//4-check owner
//5-check history(should be empty)
//6-check expiration