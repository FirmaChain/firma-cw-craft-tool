describe('cw20 update marketing with basic version contract', () => {
  it('cw20 update logo', () => {
    cy.visit(`${Cypress.env('URL')}/execute`);
    cy.walletConnectViaQR();
    cy.visit(`${Cypress.env('URL')}/execute`);

    // search and select token
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));
    cy.get('span.typo').contains('Select').click();
    cy.wait(1000);

    // select Update Logo from React Select options
    cy.get('[role="option"]').contains('Update Logo').click();
    cy.wait(1000);

    // input logo url
    cy.get('input[type="text"][placeholder="ex) https://example.thisismy.token.jpg"]')
      .clear()
      .type('https://www.google.com');

    // click Update Logo button
    cy.get('div.button-text').contains('Update Logo').parent()
      .should('not.be.disabled')
      .click();

    // QR authentication
    cy.QR_authentication();

    cy.wait(10000);
    cy.screenshot('update logo-transaction-completed');
  });
});

describe('cw20 update marketing with advanced version contract', () => {
  it('cw20 update marketing', () => {
    cy.visit(`${Cypress.env('URL')}/execute`);
    cy.walletConnectViaQR();
    cy.visit(`${Cypress.env('URL')}/execute`);

    // search and select token
    cy.searchAndSelectToken(Cypress.env('CW20_CONTRACT_ADDRESS'));
    cy.get('span.typo').contains('Select').click();
    cy.wait(1000);

    // select Update Marketing from React Select options
    cy.get('[role="option"]').contains('Update Marketing').click();
    cy.wait(1000);

    // input Description
    cy.get('input[type="string"][placeholder="This is token Description"]')
      .clear()
      .type('This is token Description');
    cy.wait(1000);

    // input Wallet Address if it exists
    cy.get('body').then($body => {
      const walletInput = 'input[type="string"][placeholder="Input Wallet Address"]';
      if ($body.find(walletInput).length > 0) {
        cy.get(walletInput)
          .clear()
          .type(Cypress.env('ADDRESS_6'));
      } else {
        cy.log('wallet address field does not exist. skipping to next step.');
      }
    });

    // input Marketing Project if it exists
    cy.get('body').then($body => {
      const projectInput = 'input[type="string"][placeholder="ex) https://firmachain.org"]';
      if ($body.find(projectInput).length > 0) {
        cy.get(projectInput)
          .clear()
          .type('https://www.google.com');
      } else {
        cy.log('marketing project field does not exist. skipping to next step.');
      }
    });

    cy.wait(1000);

    // click Update Marketing button
    cy.get('div.button-text').contains('Update Marketing').parent()
      .should('not.be.disabled')
      .click();

    // QR authentication
    cy.QR_authentication();

    cy.wait(10000);
    cy.screenshot('update marketing-transaction-completed');
  });
});