
/*
1,2,3 approve-block
1-transfer form
2-revoke
3-check expiration
*/

describe('CW721 Approv block', () => {
    it('cw721 approvev block', () => {
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

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('1')

        //set block height(BLOCK_HEIGHT + 100)
        const blockHeight = (Number(Cypress.env('BLOCK_HEIGHT').replace(/,/g, '')) + 100).toString()
        cy.get('input[type="text"][placeholder="ex) 7216240"]')
            .clear()
            .type(blockHeight)

        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        //verification with mnemonic
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
        //close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()

        //approve 2nd time
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('2')

        cy.get('input[type="text"][placeholder="ex) 7216240"]')
            .clear()
            .type(blockHeight)

        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        //verification with mnemonic
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

        //close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()

        //approve 3rd time
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('3')

        cy.get('input[type="text"][placeholder="ex) 7216240"]')
            .clear()
            .type(blockHeight)

        cy.get('button')
            .should('not.be.disabled')
            .contains('Approve')
            .click()

        //verification with mnemonic
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

        //close the modal 
        cy.get('button')
            .contains('Confirm')
            .should('be.visible')
            .parent()
            .click()    
    })

        

})

describe('transfer form - 1', () => {
    it('transfer form - 1', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        //input the wallet address to be approved
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_20'), Cypress.env('PASSWORD'))

        // search on execute page
        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        cy.get('[role="option"]').contains('Transfer').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="string"][placeholder="Input the numbers : You can input multiple numbers separated by commas (,)"]')
            .clear()
            .type('1').blur()

        cy.wait(1000)
        cy.get('button').contains('Transfer')
            .click()

        //verification with mnemonic   
        cy.wait(1000)
        cy.contains('div', 'Transfer')
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


describe('revoke - 2', () => {
    it('revoke - 2', () => {

        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        cy.get('[role="option"]').contains('Revoke').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
            .clear()
            .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
            .clear()
            .type('2')

        cy.wait(1000)
        cy.get('button').contains('Revoke')
            .should('not.be.disabled')
            .click()

        //verification with mnemonic
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
//search to check 1,2,3 status
//1 - check owner
//2 - check history(should be empty)
//3 - check history(should be empty or expired)
