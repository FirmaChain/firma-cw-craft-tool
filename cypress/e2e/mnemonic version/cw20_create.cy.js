describe('template spec', () => {
  it('login test with mnemonic', () => {
    cy.visit(Cypress.env('URL'))
    // Token 버튼 클릭
    cy.contains('Token').click()
    
    // 커스텀 명령어로 로그인
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
  })

    it('create cw20 basic token', () => {
    cy.visit(Cypress.env('URL')+'/instantiate')

    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    // Token name 입력 
    cy.get('input[placeholder="ex) My CW Token"]')
      .clear()
      .type('My Token Name basic 0730')

    // Token symbol 입력 
    cy.get('input[placeholder="ex) MCT, FCT"]')
      .clear()
      .type('MTN basic 0730')
    
    //token label 입력
    cy.get('input[placeholder="ex) Event reward contract"]')
      .clear()
      .type('My Token Label basic0730')

    //token image link 입력 
    cy.get('input[placeholder="ex) https://example.thisismy.token.jpg"]')
      .clear()
      .type('https://fastly.picsum.photos/id/781/400/400.jpg?hmac=wgdJrpy_DW0E_-8AtJ04rn4b0gAomBY-WXLW_kbmv9c')

    //token description 입력
    cy.get('input[placeholder="ex) This is my token"]')
      .clear()
      .type('This is my token-0730')

    //recipient address 입력
    cy.get('input[placeholder="Input Wallet Address"]')
      .clear()
      .type('firma1jeyd56p3auc7vn5uz6znncwtplhryw73qa5hv2')

    //token amount 입력
    cy.get('input[placeholder="0"]').eq(0)
      .clear()
      .type('1000')

    //additional Instantiation 토글 활성화
    cy.get('span.slider.round').click()
    cy.get('input[placeholder="0"]').eq(1)
      .clear()
      .type('3000')

    //Instantiate 버튼 클릭
    cy.get('div[style="top: 100px;"]').within(() => {
      cy.contains('button', 'Instantiate').click()
    })

     // 모달이 나타날 때까지 대기
    cy.wait(1000)
    cy.contains('CW20 Instantiation', { timeout: 10000 }).should('be.visible')


    cy.contains('div', 'CW20 Instantiation')
    .should('be.visible')
    .get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))
    
    // 입력 후 잠시 대기 (버튼 활성화 시간)
    cy.wait(1000)
    
    // Confirm 버튼 클릭 (정확한 구조에 맞게)
    cy.get('button').contains('div', 'Confirm').click()
    // 동작 완료 후 5초 대기하고 화면 캡쳐
    cy.wait(5000)
    cy.screenshot('create cw20 basic token contract')

    //go to my token details 페이지 이동 확인 (추가 예정)
  })
})



describe('create cw20 advanced token', () => {
      it('create cw20 advanced token', () => {
      cy.visit(Cypress.env('URL')+'/instantiate')
      cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    // advanced token 탭 클릭
    cy.contains('div', 'ADVANCED').should('be.visible')
    .click()

    // Token name 입력 
    cy.get('input[placeholder="ex) My CW Token"]')
      .clear()
      .type('My Token Name advanced 0730')

    // Token symbol 입력 
    cy.get('input[placeholder="ex) MCT, FCT"]')
      .clear()
      .type('MTN advanced 0730')

    //Decimals 입력 
    cy.get('input[placeholder="0 ~ 18"]')
      .clear()
      .type('4')//decimals 입력
    //token label 입력
    cy.get('input[placeholder="ex) Event reward contract"]')
      .clear()
      .type('My Token Label advanced 0730')

    //token image link 입력
    cy.get('input[placeholder="ex) https://example.thisismy.token.jpg"]')
      .clear()
      .type('https://fastly.picsum.photos/id/781/400/400.jpg?hmac=wgdJrpy_DW0E_-8AtJ04rn4b0gAomBY-WXLW_kbmv9c')

    //marketing description 입력
    cy.get('input[placeholder="ex) This is my token"]')
      .clear()
      .type('This is my token advanced 0730')

    //marketing address 입력
    cy.get('input[placeholder="Input wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_5'))

    //recipient address 입력
    cy.get('input[placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_5'))
    
    //marketing project 입력
    cy.get('input[placeholder="ex) https://firmachain.org"]')
      .clear()
      .type('https://firmachain.org')
    
    //token recipient address 입력 1 
    cy.get('input[placeholder="Input Wallet Address"]').eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_5'))
    cy.get('input[placeholder="0"]').eq(0)
      .clear()
      .type('2000')

    // Add 버튼 클릭 
    cy.contains('span', 'Add').parent().parent().click()
    
    cy.get('input[placeholder="Input Wallet Address"]').eq(1)
      .clear()
      .type(Cypress.env('ADDRESS_5'))
    cy.get('input[placeholder="0"]').eq(1)
      .clear()
      .type('3000')

    //additional Instantiation 토글 활성화
    cy.get('span.slider.round').click()
    cy.get('input[placeholder="Input minter address"]')
    .clear()
    .type(Cypress.env('ADDRESS_5'))

    cy.get('input[placeholder="0"]').eq(2)
      .clear()
      .type('50000')

    cy.wait(1000)
    //Instantiate 버튼 클릭 - 정확한 버튼 선택 및 활성화 대기
    cy.get('button').contains('span', 'Instantiate').should('not.be.disabled').click()
    
     // 모달이 나타날 때까지 대기
    cy.wait(1000)
    cy.contains('CW20 Instantiation', { timeout: 10000 }).should('be.visible')


    cy.contains('div', 'CW20 Instantiation')
    .should('be.visible')
    .get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))
    

    // Confirm 버튼 클릭
    cy.get('button').contains('div', 'Confirm').click()

        // 동작 완료 후 5초 대기하고 화면 캡쳐
        cy.wait(5000)
        cy.screenshot('create cw20 advanced token contract')
  })
})
 
 