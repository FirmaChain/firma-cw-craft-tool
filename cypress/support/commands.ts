// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// TypeScript declarations for custom commands
declare namespace Cypress {
  interface Chainable {
    loginWithMnemonic(mnemonic: string, password: string): Chainable<JQuery<HTMLElement>>
    searchAndSelectToken(tokenAddress: string): Chainable<JQuery<HTMLElement>>
    searchAndSelectNFT_cw721(NFT_CONTRACT_ADDRESS: string): Chainable<JQuery<HTMLElement>>
    walletConnectViaQR(): Chainable<JQuery<HTMLElement>>
    QR_authentication(): Chainable<JQuery<HTMLElement>>
  }
}

// Custom command for login with mnemonic
Cypress.Commands.add('loginWithMnemonic', (mnemonic: string, password: string) => {
  // Parameter validation
  if (!password) {
    throw new Error(`PASSWORD is ${password}! Check environment variables.`)
  }
  
  // Click the Connect Wallet button
  cy.contains('Connect Wallet').click()
  cy.wait(1000)
  // Enter mnemonic value in the mnemonic input field
  cy.get('textarea[placeholder="Enter Mnemonic"]')
    .clear()
    .type(mnemonic)
  
  // First password input field
  cy.get('input[type="password"]').eq(0)
    .clear()
    .type(password)
  
  // Second password input field (for confirmation)
  cy.get('input[type="password"]').eq(1)
    .clear()
    .type(password)

  // Click the Login button
  cy.get('button').contains('Login').click()
})

// Search and select CW20 token
Cypress.Commands.add('searchAndSelectToken', (tokenAddress: string) => {
  cy.get('input[type="text"][placeholder="Search by Token Name / Symbol / Label / Address"]')
  .clear()
  .type(tokenAddress)

  cy.wait(5000)
  cy.get('span[class="highlight"]')
  .contains(tokenAddress)
  .click()
})

// Search and select CW721 NFT
Cypress.Commands.add('searchAndSelectNFT_cw721', (NFT_CONTRACT_ADDRESS: string) => {
  cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
  .clear()
  .type(NFT_CONTRACT_ADDRESS)

  cy.wait(5000)
  cy.get('span[class="highlight"]')
  .contains(NFT_CONTRACT_ADDRESS)
  .click()
})

// QR - wallet connect
Cypress.Commands.add('walletConnectViaQR', () => {

  cy.intercept('GET', '**/connect/requests/**').as('connectStatus')
    
  // Visit the page and start wallet connection
  cy.visit('https://craft-cw-testnet.firmachain.dev/instantiate')
  cy.contains('Connect Wallet').click()
  
  // Check QR code display and take screenshot
  cy.get('#react-qrcode-logo', { timeout: 10000 })
    .should('be.visible')
  
  // Manual scan guide
  cy.log('📱 QR Code is displayed! Please scan with your mobile wallet')
  cy.log('⏳ Test will wait for connection approval...')
  
  // Wait for connection success (simple way)
  cy.wait('@connectStatus', { timeout: 120000 }).then((interception) => {
    const response = interception.response.body
    cy.log('📡 First API response:', response)
    
    // Check if connection is successful
    if (response.code === 0 && 
        response.message === "success" && 
        response.result?.status === "1") {
      
      cy.log('🎉 Wallet connection SUCCESS!')
      cy.log('💼 Connected wallet:', response.result.signer)
      cy.screenshot('wallet-connected-success')
      
    } else {
      cy.log('⏳ First check shows pending, continuing to wait...')
      
      // Second attempt
      cy.wait('@connectStatus', { timeout: 60000 }).then((interception2) => {
        const response2 = interception2.response.body
        cy.log('📡 Second API response:', response2)
        
        if (response2.code === 0 && response2.result?.status === "1") {
          cy.log('🎉 Connection successful on second check!')
          //cy.screenshot('wallet-connected-success')
        }
      })
    }
  })
  
  // After connection, check UI changes
  // Check if the modal with "Connect to Mobile" title disappears
  cy.get('body', { timeout: 30000 }).should('not.contain', 'Connect to Mobile')
  cy.log('✅ Connect Wallet button disappeared - connection successful!')
})


// Execute QR verification
Cypress.Commands.add('QR_authentication', () => {

  //cy.intercept('GET', '**/connect/requests/**').as('connectStatus')
    
  // Manual scan guide
  cy.log('📱 QR Code is displayed! Please scan with your mobile wallet')
  cy.log('⏳ Test will wait for connection approval...')
  
  // Wait for connection success (simple way)
  cy.wait('@connectStatus', { timeout: 120000 }).then((interception) => {
    const response = interception.response.body
    cy.log('📡 First API response:', response)
    
    // Check if connection is successful
    if (response.code === 0 && 
        response.message === "success" && 
        response.result?.status === "1") {
      
      cy.log('🎉 Wallet connection SUCCESS!')
      cy.log('💼 Connected wallet:', response.result.signer)
      cy.screenshot('wallet-connected-success')
      
    } else {
      cy.log('⏳ First check shows pending, continuing to wait...')
      
      // Second attempt
      cy.wait('@connectStatus', { timeout: 600000 }).then((interception2) => {
        const response2 = interception2.response.body
        cy.log('📡 Second API response:', response2)
        
        if (response2.code === 0 && response2.result?.status === "1") {
          cy.log('🎉 Connection successful on second check!')
          //cy.screenshot('wallet-connected-success')
        }
      })
    }
  })
  
  // After connection, check UI changes
  // Check if the modal with "Connect to Mobile" title disappears
  cy.get('body', { timeout: 30000 }).should('not.contain', 'Connect to Mobile')
  cy.log('✅ Connect Wallet button disappeared - connection successful!')
})
