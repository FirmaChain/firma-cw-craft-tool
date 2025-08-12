describe('cw20 execute', () => {
    
    it('cw20 mint', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        //mint - 드롭다운에서 Mint 선택
        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // React Select 옵션에서 Mint 선택
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
        
        // 동작 완료 후 5초 대기하고 화면 캡쳐
        cy.wait(5000)
        cy.screenshot('mint-transaction-completed')
        
        
    })

    it('cw20 transfer', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        //드롭 다운 선택
        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // React Select 옵션에서 Transfer 선택
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
        
        // React Select 옵션에서 Increase Allowance 선택
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
/* 에러 해결 필요
    it('cw20 burn from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // React Select 옵션에서 Burn From 선택
        cy.get('[role="option"]').contains('Burn From').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5')).blur()

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('50').blur()


        //occured error - 오류 해결 필요
        cy.wait(1000)
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
    //waiting - 만료될 때까지
    //burn from 만료로 버튼 비활성화 확안
*/
    it('cw20 decrease allowance_time', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
        
        // React Select 옵션에서 Increase Allowance 선택
        cy.get('[role="option"]').contains('Increase Allowance').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('200')//200 만 할당

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
        
        // React Select 옵션에서 Transfer From 선택
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
    //waiting - 만료될 때까지
    //tranfer from 만료로 버튼 비활성화 확인

    
    it('cw20 decrease allowance_forever', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // React Select 옵션에서 Increase Allowance 선택
        cy.get('[role="option"]').contains('Increase Allowance').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_6')) 

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('200')//200 만 할당


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

    //200만 할당된 상테애서 50을 burn
    it('cw20 burn from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // React Select 옵션에서 Burn From 선택
        cy.get('[role="option"]').contains('Burn From').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('input[type="text"][placeholder="0"]')
        .clear()
        .type('50')//burn

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

        // React Select 옵션에서 Decrease Allowance 선택
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

    
    //searching 에서 검색
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
        
        // React Select 옵션에서 Increase Allowance 선택
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
        
        // React Select 옵션에서 Burn From 선택
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

        // React Select 옵션에서 Decrease Allowance 선택   
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
    /*
    it('cw20 burn from', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_6'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // React Select 옵션에서 Burn From 선택
        cy.get('[role="option"]').contains('Burn From').click()

        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_5'))

        cy.get('input[type="text"][placeholder="0"]').eq(0)
        .clear()
        .type('50')

        //add 버튼을 눌러 index 증가
        cy.get('input[type="string"][placeholder="Input Wallet Address"]').eq(1)
        .clear()
        .type(Cypress.env('ADDRESS_5'))
        cy.get('input[type="text"][placeholder="0"]').eq(1)
        .clear()
        .type('50')

        cy.get('div[class="button-text"]').contains('Burn').parent()
        .should('not.be.disabled')
        .click()

        cy.wait(1000)
        cy.contains('Burn').should('be.visible')

        cy.get('input[type="password"][placeholder="Enter Password"]')
        .clear()
        .type(Cypress.env('PASSWORD'))

        cy.get('button').contains('div', 'Confirm')
        .should('not.be.disabled')
        .click()

        cy.wait(10000)
        cy.screenshot('burn from-transaction-completed')
    })
*/

    
    it('cw20 update minter', () => {
        cy.visit(Cypress.env('URL') + '/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_20'), Cypress.env('PASSWORD'))

        //search on execute page
        cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS_2'))

        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)

        // React Select 옵션에서 Update Minter 선택
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

    // React Select 옵션에서 Update Logo 선택
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

    // React Select 옵션에서 Update Marketing 선택
    cy.get('[role="option"]').contains('Update Marketing').click()

    cy.wait(1000)
    cy.get('input[type="string"][placeholder="This is token Description"]').clear()
    .type('This is token Description')

    cy.wait(1000)
    // 주소 입력 필드가 있는지 확인하고 있을 때만 실행
    cy.get('body').then(($body) => {
        if ($body.find('input[type="string"][placeholder="Input Wallet Address"]').length > 0) {
            cy.get('input[type="string"][placeholder="Input Wallet Address"]').clear()
            .type(Cypress.env('ADDRESS_6'))
        } else {
            cy.log('wallet address 필드가 없습니다. 다음 단계로 넘어갑니다.')
        }
    })

    cy.get('body').then(($body) => {
        if ($body.find('input[type="string"][placeholder="ex) https://firmachain.org"]').length > 0) {
                cy.get('input[type="string"][placeholder="ex) https://firmachain.org"]').clear()
                .type('https://www.google.com')
        } else {
            cy.log('marketing project 입력 필드가 없습니다. 다음 단계로 넘어갑니다.')
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


