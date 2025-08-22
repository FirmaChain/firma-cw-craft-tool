describe('CW721 Mint-mnemonic', () => {

    it('NFT mint 1-9', () => {
      cy.walletConnectViaQR()
      cy.visit(Cypress.env('URL') + '/cw721/execute')
      // go to execute page
      cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))
  
      // select Mint from dropdown
      cy.get('span[class="typo"]').contains('Select').click()
      cy.wait(1000)
  
      cy.get('[role="option"]').contains('Mint').click()
      cy.wait(1000)
  
      // input wallet address to receive NFTs
      cy.get('input[type="string"][placeholder="Input wallet address"]')
        .clear()
        .type(Cypress.env('ADDRESS_30'))
  
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
  
      // QR authentication
      cy.wait(1000)
      cy.QR_authentication()
  
      cy.wait(10000)
      cy.screenshot('cw721-mint-transaction-completed')
  
      //go to My NFT Details
      cy.get('button').contains('Go to My NFT Details').should('be.visible').parent().click()
  
    })
  
   // all approve & revoke - additional mint
    it('additional NFT mint', () => {
      cy.walletConnectViaQR()
      cy.visit(Cypress.env('URL') + '/cw721/execute')
  
      cy.searchAndSelectNFT_cw721(Cypress.env('CW721_CONTRACT_ADDRESS'))
  
      // select Mint from dropdown
      cy.get('span[class="typo"]').contains('Select').click()
      cy.wait(1000)
  
      cy.get('[role="option"]').contains('Mint').click()
      cy.wait(1000)
  
      cy.get('input[type="string"][placeholder="Input wallet address"]').eq(0)
        .clear()
        .type(Cypress.env('ADDRESS_30'))
  
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
  
     // QR authentication
     cy.wait(1000)
     cy.QR_authentication()
  
     cy.wait(10000)
     cy.screenshot('cw721-mint-transaction-completed')
  
     //go to My NFT Details
     cy.get('button').contains('Go to My NFT Details').should('be.visible').parent().click()
  
    })
   
  })
  