describe('CW721 Mint-mnemonic', () => {


  it('NFT mint 1-9', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))
    // go to execute page
    cy.visit(Cypress.env('URL') + '/cw721/execute')

    cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

    // select Mint from dropdown
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Mint').click()
    cy.wait(1000)

    // input wallet address to receive NFTs
    cy.get('input[type="string"][placeholder="Input wallet address"]')
      .clear()
      .type(Cypress.env('ADDRESS_5'))

    const nftData = Array.from({ length: 8 }, (_, index) => ({
      NFT_ID: String(index + 1),
      metadataUri: Cypress.env('IMAGE_URL')
    }))

    nftData.forEach((nft, index) => {
      cy.get('input[type="text"][placeholder="0"]').eq(index)
        .clear()
        .type(nft.NFT_ID)

      cy.get('input[type="string"][placeholder="Input NFT Metadata URI"]').eq(index)
        .clear()
        .type(nft.metadataUri)

      // if not the last one, click Add button
      if (index < nftData.length - 1) {
        cy.get('span').contains('Add').click()
      }
      cy.wait(1000)
    })

    cy.get('button').contains('Mint')
      .should('not.be.disabled', { timeout: 1000000 })
      .click()

    // verification mnemonic
    cy.wait(1000)
    cy.contains('div', 'Mint')
    .get('input[type="password"][placeholder="Enter Password"]')
      .should('be.visible')
      .clear()
      .type(Cypress.env('PASSWORD')).blur()

    cy.wait(3000)
    cy.get('button').contains('div', 'Confirm').click()

    cy.wait(10000)
    //go to My NFT Details
    cy.get('button').contains('Go to My NFT Details').should('be.visible').parent().click()

  })

 // all approve & revoke - additional mint
  it('additional NFT mint', () => {
    cy.visit(Cypress.env('URL') + '/cw721/execute')
    cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

    cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

    // go to execute page
    cy.visit(Cypress.env('URL') + '/cw721/execute')

    cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))

    // select Mint from dropdown
    cy.get('span[class="typo"]').contains('Select').click()
    cy.wait(1000)

    cy.get('[role="option"]').contains('Mint').click()
    cy.wait(1000)

    cy.get('input[type="string"][placeholder="Input wallet address"]').eq(0)
      .clear()
      .type(Cypress.env('ADDRESS_5'))

    // input the desired NFT ID and metadata URI
    const nftData = [
      { NFT_ID: '11', metadataUri: Cypress.env('IMAGE_URL') },
      { NFT_ID: '12', metadataUri: Cypress.env('IMAGE_URL') },
      { NFT_ID: '13', metadataUri: Cypress.env('IMAGE_URL') },
      { NFT_ID: '14', metadataUri: Cypress.env('IMAGE_URL') },
      { NFT_ID: '15', metadataUri: Cypress.env('IMAGE_URL') },
      { NFT_ID: '16', metadataUri: Cypress.env('IMAGE_URL') }
    ]
    nftData.forEach((nft, index) => {
      cy.get('input[type="text"][placeholder="0"]').eq(index)
        .clear()
        .type(nft.NFT_ID)

      cy.get('input[type="string"][placeholder="Input NFT Metadata URI"]').eq(index)
        .clear()
        .type(nft.metadataUri)

      // if not the last one, click Add button
      if (index < nftData.length - 1) {
        cy.get('span').contains('Add').click()
      }
      cy.wait(1000)
    })
    cy.wait(1000)
    cy.get('button').contains('Mint')
      .should('not.be.disabled')
      .click()

   // verification with mnemonic
   cy.wait(1000)
   cy.contains('div', 'Mint')
   .get('input[type="password"][placeholder="Enter Password"]')
     .should('be.visible')
     .clear()
     .type(Cypress.env('PASSWORD')).blur()

   cy.wait(3000)
   cy.get('button').contains('div', 'Confirm').click()

   cy.wait(10000)
   //go to My NFT Details
   cy.get('button').contains('Go to My NFT Details').should('be.visible').parent().click()

  })
 
})
