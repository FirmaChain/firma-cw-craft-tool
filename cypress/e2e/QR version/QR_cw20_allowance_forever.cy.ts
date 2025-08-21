describe('cw20 allowance_forever', () => {
  
  it('cw20 decrease allowance_forever', () => {
    cy.visit(Cypress.env('URL') + '/execute');
    cy.walletConnectViaQR()
    cy.visit(Cypress.env('URL') + '/execute')

    // search on execute page
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));

    cy.get('span.typo').contains('Select').click();
    cy.wait(1000);

    // select Increase Allowance from React Select options
    cy.get('[role="option"]').contains('Increase Allowance').click();

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_6'));

    cy.get('input[type="text"][placeholder="0"]')
      .clear()
      .type('200');

    // click Forever button
    cy.get('button').contains('Forever').click();

    cy.wait(1000);
    cy.get('button').contains('Increase Allowance').parent()
      .should('not.be.disabled')
      .click();

    //QR authentication
    cy.QR_authentication()

    // wait for 10 seconds and capture screen
    cy.wait(10000);
    cy.screenshot('increase allowance_forever-transaction-completed');
  });

  it('cw20 burn from', () => {
    cy.visit(Cypress.env('URL') + '/execute');
    cy.walletConnectViaQR()
    cy.visit(Cypress.env('URL') + '/execute')

    // search on execute page
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));

    cy.get('span.typo').contains('Select').click();
    cy.wait(1000);

    // select Burn From from React Select options
    cy.get('[role="option"]').contains('Burn From').click();

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_5'));

    cy.get('input[type="text"][placeholder="0"]')
      .clear()
      .type('50'); // amount to burn

    cy.get('div.button-text').contains('Burn').parent()
      .should('not.be.disabled')
      .click();

    //QR authentication
    cy.QR_authentication()

    // wait for 10 seconds and capture screen
    cy.wait(10000);
    cy.screenshot('burn from-transaction-completed');
  });

  it('cw20 decrease allowance_forever', () => {
    cy.visit(Cypress.env('URL') + '/execute');
    cy.walletConnectViaQR()
    cy.visit(Cypress.env('URL') + '/execute')
    
    // search on execute page
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));

    cy.get('span.typo').contains('Select').click();
    cy.wait(1000);

    // select Decrease Allowance from React Select options
    cy.get('[role="option"]').contains('Decrease Allowance').click();

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_6'));

    cy.get('input[type="text"][placeholder="0"]')
      .clear()
      .type('50');

    cy.get('button').contains('Forever').click();

    cy.wait(1000);
    cy.get('button').contains('Decrease Allowance').parent()
      .should('not.be.disabled')
      .click();

    //QR authentication
    cy.QR_authentication()

    // wait for 10 seconds and capture screen
    cy.wait(10000);
    cy.screenshot('decrease allowance_forever-transaction-completed');
  });

});