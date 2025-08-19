describe('cw721 ownership transfer-block', () => {
  it('cw721 ownership', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    // Search for the contract on the execute page
    cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS'))

    cy.wait(5000)
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS'))
      .click()

    // Start ownership transfer update
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_6')) // Change to the wallet address to receive ownership

    cy.get('input[type="text"][placeholder="ex) 7216240"]')
      .clear()
      .type(Cypress.env('BLOCK_HEIGHT'))

    cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    // Authenticate with mnemonic password
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

    // Check registration and expiration on the search page
    cy.visit('https://craft-cw-testnet.firmachain.dev/cw721/search')
    cy.wait(5000)

    cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
      .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS'))

    // Check search result
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS'))
      .click()

    // Check owner information on the search page
    // Scroll down to the Minter section
    cy.contains('Minter').scrollIntoView()
    cy.wait(1000) // Wait for scroll animation

    // Take a screenshot
    cy.screenshot('cw721-ownership-transfer-block')
    
    // Expiration check needs to be done separately
  })

})

// time-based ownership transfer
describe('cw721 ownership-time', () => {
  it('cw721 ownership-time', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    cy.visit(Cypress.env('URL') + '/cw721/execute')

    // Search for the contract on the execute page
    cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_2'))

    cy.wait(5000)
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
      .click()

    // Start ownership transfer update
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_6')) // Change to the wallet address to receive ownership

    // Set expiration by time
    cy.get('button').contains('At Time').click()
    cy.wait(1000)
    cy.get('input[type="text"][placeholder="ex) MMMM-dd-yyyy HH:mm:ss a"]') // This may need to be fixed later
      .click()

    cy.contains('Set the Expiration date and time').should('be.visible')
      .get('button').contains('button', 'Set').click()

    cy.wait(1000)

    cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    // Authenticate with mnemonic password
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
    cy.get('button').contains('Confirm', { timeout: 15000 }).click()
    cy.wait(1000)
    // Check registration and expiration on the search page
    cy.get('button').contains('Search').parent().click()

    cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
      .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_2'))

    // Check search result
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS_2'))
      .click()

    // Check owner information on the search page
    // Scroll down to the Minter section
    cy.contains('Minter').scrollIntoView()
    cy.wait(1000) // Wait for scroll animation

    // Take a screenshot
    cy.screenshot('cw721-ownership-transfer-time')
    
    // Expiration check needs to be done separately
  })

  it('cw721 ownership-forever', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    cy.visit(Cypress.env('URL') + '/cw721/execute')

    // Search for the contract on the execute page
    cy.get('input[type="text"]').first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))

    cy.wait(5000)
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
      .click()

    // Start ownership transfer update
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input Wallet Address"]')
      .clear()
      .type(Cypress.env('ADDRESS_6')) // The wallet to receive this contract’s ownership

    cy.get('button').contains('Forever').click()
    cy.get('button').should('not.be.disabled').contains('Update Ownership Transfer').click()
    cy.wait(1000)

    // Authenticate with mnemonic password
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
    cy.get('button').contains('Confirm', { timeout: 15000 }).click()
    cy.wait(1000)
    
    // Check registration and expiration on the search page
    cy.get('button').contains('Search').click()
    cy.wait(1000)

    cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
      .first().clear().type(Cypress.env('CW721_CONTRACT_ADDRESS_3'))

    // Check search result
    cy.get('span[class="highlight"]')
      .contains(Cypress.env('CW721_CONTRACT_ADDRESS_3'))
      .click()

    // Check owner information on the search page
    // Scroll down to the Minter section
    cy.contains('Minter').scrollIntoView()
    cy.wait(1000) // Wait for scroll animation

    // Take a screenshot
    cy.screenshot('cw721-ownership-transfer-forever')
    
  })

})