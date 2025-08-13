describe('cw20 execute', () => {
    
    it('cw20 mint', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        //mint - select Mint from dropdown
        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Mint from React Select options
        cy.get('[role="option"]').contains('Mint').click()
        cy.wait(1000)

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_20'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('1500')

        cy.get('div[class="button-text"]').contains('Mint').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Mint').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm').click()
        
        // wait for 5 seconds and capture screen
        cy.wait(5000)
        cy.screenshot('mint-transaction-completed')
        
        
    })

    it('cw20 transfer', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        //click dropdown
        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // select Transfer from React Select options
        cy.get('[role="option"]').contains('Transfer').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('100')

        cy.get('div[class="button-text"]').contains('Transfer').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Transfer').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm').click()

        cy.wait(5000)
        cy.screenshot('transfer-transaction-completed')
    })
    
    it('cw20 increase allowance_block', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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
        cy.contains('Increase Allowance').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(5000)
        cy.screenshot('increase allowance_block-transaction-completed')
    
    })
    //Need to check the 'burn from' function directly

    it('cw20 decrease allowance_time', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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
        cy.contains('Increase Allowance').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('increase allowance_time-transaction-completed')
        
    })

    it('cw20 decrease transfer from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Transfer From from React Select options
        cy.get('[role="option"]').contains('Transfer From').click()

        cy.get('input[type="string"][placeholder="Input address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5'))

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
        cy.contains('Transfer').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')   
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('transfer from-transaction-completed')
    })
    //waiting - until expiration
    //tranfer from expiration - disable button

    
    it('cw20 decrease allowance_forever', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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


        //click Forever button
        cy.get('button').contains('Forever').click()

        cy.wait(1000)
        cy.get('button').contains('Increase Allowance').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Increase Allowance').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('increase allowance_forever-transaction-completed')

        
    })

    it('cw20 burn from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // select Burn From from React Select options
        cy.get('[role="option"]').contains('Burn From').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('50')//amount to burn

        cy.get('div[class="button-text"]').contains('Burn').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Burn').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('burn from-transaction-completed')
    })
    

    it('cw20 decrease decrease allowance_block', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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
        cy.contains('Decrease Allowance').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('decrease allowance_block-transaction-completed')

    })

    
    //search on search page
    it('cw20 searching', () => {
        cy.visit(Cypress.env('URL') + '/search')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on search page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))
        
        cy.wait(3000)
        
        cy.get('input[type="text"][placeholder="Search by CW20 Wallet Address"]')
        .eq(1)
        .scrollIntoView({block: 'center', inline: 'nearest'})
        .should('be.visible')
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('button').contains('Search').click()
        cy.wait(3000)
        cy.screenshot('searching-decrease allowance_block')
    })

    

    it('cw20 decrease decrease allowance_time', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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

        cy.get('button').contains('At Time').click()
        cy.get('input[type="text"][placeholder="ex) MM-DD-YYYY  HH:MM:SS"]')
        .click()

        cy.contains('Set the Expiration date and time').should('be.visible')
        .get('button').contains('button','Set').click()

        cy.wait(1000)
        cy.get('button').contains('Decrease Allowance').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Decrease Allowance').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(8000)
        cy.screenshot('decrease allowance_time-transaction-completed')
        
    })

    it('cw20 burn from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // select Burn From from React Select options
        cy.get('[role="option"]').contains('Burn From').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('50')

        cy.get('div[class="button-text"]').contains('Burn').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Burn').should('be.visible')
        .get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(5000)
        cy.screenshot('burn from-transaction-completed')
    })
    
    it('cw20 decrease decrease allowance_forever', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

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
        .type('50')

        cy.get('button').contains('Forever').click()

        cy.wait(1000)
        cy.get('button').contains('Decrease Allowance').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Decrease Allowance').should('be.visible')

        cy.wait(2000)
        cy.get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(10000)
        cy.screenshot('decrease allowance_forever-transaction-completed')

    })
    //need to check the 'burn from' function directly
    
    it('cw20 update minter', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_20'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS_2'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // select Update Minter from React Select options
        cy.get('[role="option"]').contains('Update Minter').click()

        cy.wait(1000)
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
        .should('be.value', Cypress.env('ADDRESS_20'))
        .clear().type(Cypress.env('ADDRESS_6'))

        cy.get('div[class="button-text"]').contains('Update Minter').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Update Minter').should('be.visible')

        cy.wait(2000)
        cy.get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(10000)
        cy.screenshot('decrease allowance_forever-transaction-completed')
        
    })

   it('cw20 update logo', () => {
    cy.visit(Cypress.env('URL') + '/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

    //search on execute page
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    // select Update Logo from React Select options
    cy.get('[role="option"]').contains('Update Logo').click()

    cy.wait(1000)
    cy.get('input[type="text"][placeholder="ex) https://example.thisismy.token.jpg"]')
    .clear()
    .type('https://www.google.com')

    cy.get('div[class="button-text"]').contains('Update Logo').parent()
    .should('not.be.disabled')
    .click()

    cy.wait(1000)
    cy.contains('Update Logo').should('be.visible')

    cy.wait(2000)
    cy.get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))

    cy.get('button').contains('div', 'Confirm')
    .should('not.be.disabled')
    .click()

    cy.wait(10000)
    cy.screenshot('update logo-transaction-completed')
    
   })
    
   it('cw20 update marketing', () => {
    cy.visit(Cypress.env('URL') + '/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    //search on execute page
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    // select Update Marketing from React Select options
    cy.get('[role="option"]').contains('Update Marketing').click()

    cy.wait(1000)
    cy.get('input[type="string"][placeholder="This is token Description"]').clear()
    .type('This is token Description')

    cy.wait(1000)
    // check if wallet address field exists and execute if it does
    cy.get('body').then(($body) => {
        if ($body.find('input[type="string"][placeholder="Input Wallet Address"]').length > 0) {
            cy.get('input[type="string"][placeholder="Input Wallet Address"]').clear()
            .type(Cypress.env('ADDRESS_6'))
        } else {
            cy.log('wallet address field does not exist. skipping to next step.')
        }
    })

    cy.get('body').then(($body) => {
        if ($body.find('input[type="string"][placeholder="ex) https://firmachain.org"]').length > 0) {
                cy.get('input[type="string"][placeholder="ex) https://firmachain.org"]').clear()
                .type('https://www.google.com')
        } else {
            cy.log('marketing project field does not exist. skipping to next step.')
        }
    })


    cy.wait(1000)
    cy.get('div[class="button-text"]').contains('Update Marketing').parent()
    .should('not.be.disabled')
    .click()

    cy.wait(1000)
    cy.contains('Update Marketing').should('be.visible')

    cy.wait(2000)
    cy.get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))

    cy.get('button').contains('div', 'Confirm')
    .should('not.be.disabled')
    .click()

    cy.wait(10000)
    cy.screenshot('update marketing-transaction-completed')
   }) 

})


