describe('cw721 ownership transfer-block', () => {
  it('cw721 ownership', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    // search on execute page
    cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS'))

    cy.wait(5000)
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS'))
      .click()

    // update ownership transfer
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_6')) //지갑 주소 변경 필요

    cy.get('input[type="text"][placeholder="ex) 7216240"]')
      .clear()
      .type(Cypress.env('BLOCK_HEIGHT'))

    cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    // mnemonic 인증
    cy.wait(1000)
    cy.contains('div', 'Update Ownership Transfer')
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

    cy.get('button').contains('Confirm').click()

    // 등록과 만료 search 에서 확인
    cy.visit('https://craft-cw-testnet.firmachain.dev/cw721/search')
    cy.wait(5000)

    cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
      .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS'))

    // search 결과 확인
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS'))
      .click()

    // search 에서 owner imformation 확인
    // Minter가 있는 곳까지 스크롤 내리기
    cy.contains('Minter').scrollIntoView()
    cy.wait(1000) // 스크롤 애니메이션 대기

    // 스크린샷 찍기
    cy.screenshot('cw721-ownership-transfer-block')
    
    //만료는 따로 확인 필요
  })

})

  //time
  describe('cw721 ownership-time', () => {
    
    it('cw721 ownership-time', () => {
        cy.visit(Cypress.env('URL') + '/cw721/execute')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
        cy.visit(Cypress.env('URL') + '/cw721/execute')
    
        // search on execute page
        cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
    
        cy.wait(5000)
        cy.get('span[class="highlight"]')
          .contains(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
          .click()
    
        // update ownership transfer
        cy.get('span[class="typo"]').contains('Select').click()
        cy.wait(1000)
    
        cy.get('[role="option"]').contains('Update Ownership Transfer').click()
        cy.wait(1000)
    
        cy.get('input[type="string"][placeholder="Input Wallet Address"]')
        .clear()
        .type(Cypress.env('ADDRESS_6')) //지갑 주소 변경 필요
    
        //time setting
        cy.get('button').contains('At Time').click()
        cy.wait(1000)
        cy.get('input[type="text"][placeholder="ex) MMMM-dd-yyyy HH:mm:ss a"]')//이거 나중에 고쳐야함
            .click()

        cy.contains('Set the Expiration date and time').should('be.visible')
            .get('button').contains('button', 'Set').click()

        cy.wait(1000)
    
        cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
        cy.wait(1000)
    
       // mnemonic 인증
    cy.wait(1000)
    cy.contains('div', 'Update Ownership Transfer')
        .get('input[type="password"][placeholder="Enter Password"]')
        .should('be.visible')
        .clear()
        .type(Cypress.env('PASSWORD'))
        .blur()
    cy.wait(3000)
    cy.get('button')
        .contains('div', 'Confirm')
        .click()
    
        cy.wait(15000)
        cy.get('button').contains('Confirm',{timeout: 15000}).click()
        cy.wait(1000)
        //등록과 만료 search 에서 확인
        cy.get('button').contains('Search').parent().click()
    
        cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
        .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
    
        // search 결과 확인
        cy.get('span[class="highlight"]')
        .contains(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
        .click()
    
        // search 에서 owner imformation 확인
        // Minter가 있는 곳까지 스크롤 내리기
        cy.contains('Minter').scrollIntoView()
        cy.wait(1000) // 스크롤 애니메이션 대기
    
        // 스크린샷 찍기
        cy.screenshot('cw721-ownership-transfer-time')
        
        //만료는 따로 확인 필요
  })

  it('cw721 ownership-forever', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    cy.visit(Cypress.env('URL') + '/cw721/execute')

    // search on execute page
    cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))

    cy.wait(5000)
    cy.get('span[class="highlight"]')
    .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
    .click()

    // update ownership transfer
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
    .clear()
    .type(Cypress.env('ADDRESS_6')) //지갑 주소 변경 필요

    cy.get('button').contains('Forever').click()
    cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    // mnemonic 인증
    cy.wait(1000)
    cy.contains('div', 'Update Ownership Transfer')
        .get('input[type="password"][placeholder="Enter Password"]')
        .should('be.visible')
        .clear()
        .type(Cypress.env('PASSWORD'))
        .blur()
    cy.wait(3000)
    cy.get('button')
        .contains('div', 'Confirm')
        .click()
    cy.wait(15000)
    cy.get('button').contains('Confirm',{timeout: 15000}).click()
    cy.wait(1000)
    
    //등록과 만료 search 에서 확인
    cy.get('button').contains('Search').click()
    cy.wait(1000)

    cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
      .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))

    // search 결과 확인
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
      .click()

    // search 에서 owner imformation 확인
    // Minter가 있는 곳까지 스크롤 내리기
    cy.contains('Minter').scrollIntoView()
    cy.wait(1000) // 스크롤 애니메이션 대기


    // 스크린샷 찍기
    cy.screenshot('cw721-ownership-transfer-forever')

    
  })

})