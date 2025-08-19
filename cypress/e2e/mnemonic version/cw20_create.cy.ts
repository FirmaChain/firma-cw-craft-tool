describe('template spec', () => {
  it('login test with mnemonic', () => {
    cy.visit(Cypress.env('URL'))
    // click Token button 
    cy.contains('Token').click()
    
    //login with mnemonic
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
  })

    it('create cw20 basic token', () => {
    cy.visit(Cypress.env('URL')+'/instantiate')

    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    // input Token name 
    cy.get('input[placeholder="ex) My CW Token"]')
      .clear()
      .type('My Token Name basic 0730')

    // input Token symbol 
    cy.get('input[placeholder="ex) MCT, FCT"]')
      .clear()
      .type('MTN basic 0730')
    
    //input token label 
    cy.get('input[placeholder="ex) Event reward contract"]')
      .clear()
      .type('My Token Label basic0730')

    //input token image link 
    cy.get('input[placeholder="ex) https://example.thisismy.token.jpg"]')
      .clear()
      .type('https://fastly.picsum.photos/id/781/400/400.jpg?hmac=wgdJrpy_DW0E_-8AtJ04rn4b0gAomBY-WXLW_kbmv9c')

    //input token description 
    cy.get('input[placeholder="ex) This is my token"]')
      .clear()
      .type('This is my token-0730')

    //input recipient address 
    cy.get('input[placeholder="Input Wallet Address"]')
      .clear()
      .type('firma1jeyd56p3auc7vn5uz6znncwtplhryw73qa5hv2')

    //input token amount 
    cy.get('input[placeholder="0"]').eq(0)
      .clear()
      .type('1000')

    //activate additional instantiation toggle
    cy.get('span.slider.round').click()
    cy.get('input[placeholder="0"]').eq(1)
      .clear()
      .type('3000')

    //click Instantiate button 
    cy.get('div[style="top: 100px;"]').within(() => {
      cy.contains('button', 'Instantiate').click()
    })

     // wait for modal to appear
    cy.wait(1000)
    cy.contains('CW20 Instantiation', { timeout: 10000 }).should('be.visible')


    cy.contains('div', 'CW20 Instantiation')
    .should('be.visible')
    .get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))

    // wait for button to be enabled
    cy.wait(1000)
    
    // click Confirm button 
    cy.get('button').contains('div', 'Confirm').click()
    // wait for 5 seconds and capture screen
    cy.wait(5000)
    cy.screenshot('create cw20 basic token contract')

  })
})



describe('create cw20 advanced token', () => {
      it('create cw20 advanced token', () => {
      cy.visit(Cypress.env('URL')+'/instantiate')
      cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    // click advanced token tab 
    cy.contains('div', 'ADVANCED').should('be.visible')
    .click()

    // input Token name 
    cy.get('input[placeholder="ex) My CW Token"]')
      .clear()
      .type('My Token Name advanced 0730')

    // input Token symbol 
    cy.get('input[placeholder="ex) MCT, FCT"]')
      .clear()
      .type('MTN advanced 0730')

    //input Decimals 
    cy.get('input[placeholder="0 ~ 18"]')
      .clear()
      .type('4')//input decimals 
    //input token label 
    cy.get('input[placeholder="ex) Event reward contract"]')
      .clear()
      .type('My Token Label advanced 0730')

    //input token image link 
    cy.get('input[placeholder="ex) https://example.thisismy.token.jpg"]')
      .clear()
      .type('https://fastly.picsum.photos/id/781/400/400.jpg?hmac=wgdJrpy_DW0E_-8AtJ04rn4b0gAomBY-WXLW_kbmv9c')

    //input marketing description 
    cy.get('input[placeholder="ex) This is my token"]')
      .clear()
      .type('This is my token advanced 0730')

    //input marketing address 
    cy.get('input[placeholder="Input wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_5'))

    //input recipient address 
    cy.get('input[placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_5'))
        
    //input marketing project 
    cy.get('input[placeholder="ex) https://firmachain.org"]')
      .clear()
      .type('https://firmachain.org')
    
    //input token recipient address 1 
    cy.get('input[placeholder="Input Wallet Address"]').eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_5'))
    cy.get('input[placeholder="0"]').eq(0)
      .clear()
      .type('2000')

    // click Add button 
    cy.contains('span', 'Add').parent().parent().click()
    
    cy.get('input[placeholder="Input Wallet Address"]').eq(1)
      .clear()
      .type(Cypress.env('ADDRESS_5'))
    cy.get('input[placeholder="0"]').eq(1)
      .clear()
      .type('3000')

    //activate additional instantiation toggle
    cy.get('span.slider.round').click()
    cy.get('input[placeholder="Input minter address"]')
    .clear()
    .type(Cypress.env('ADDRESS_5'))

    cy.get('input[placeholder="0"]').eq(2)
      .clear()
      .type('50000')

    cy.wait(1000)//wait for button to be enabled
    //click Instantiate button 
    cy.get('button').contains('span', 'Instantiate').should('not.be.disabled').click()
    
    //wait for modal to appear
    cy.wait(1000)
    cy.contains('CW20 Instantiation', { timeout: 10000 }).should('be.visible')


    cy.contains('div', 'CW20 Instantiation')
    .should('be.visible')
    .get('input[type="password"][placeholder="Enter Password"]')
    .clear()
    .type(Cypress.env('PASSWORD'))
    

    // click Confirm button 
    cy.get('button').contains('div', 'Confirm').click()

    // wait for 5 seconds and capture screen
    cy.wait(5000)
    cy.screenshot('create cw20 advanced token contract')
  })
})
 
 