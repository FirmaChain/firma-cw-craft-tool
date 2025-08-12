describe('create cw721 basic contract', () => {
    it('create cw721 basic contract', () => {
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        // NFT contract name 
        cy.get('input[type="string"][placeholder="ex) MY CW NFT Contract"]')
            .clear()
            .type('My NFT Contract Name basic 0730')

        // NFT contract symbol 
        cy.get('input[placeholder="ex) MCT, FCT"]')
            .clear()
            .type('MNCN basic')

        cy.get('input[placeholder="ex) Event reward contract"]')
            .clear()
            .type('My NFT Contract Label basic 0730')

        cy.wait(1000)
        cy.get('span[class="button-text"]').contains('Instantiate')
            .should('not.be.disabled')
            .click()

        cy.wait(1000)
        cy.contains('CW721 Instantiation', { timeout: 10000 }).should('be.visible')

        cy.contains('div', 'CW721 Instantiation')
            .should('be.visible')
            .get('input[type="password"][placeholder="Enter Password"]')
            .clear()
            .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm').click()

        // 결과 모달이 나타날 때까지 충분히 대기
        cy.wait(8000)
        cy.screenshot('create cw721 basic contract')
        
    })
})


describe('create cw721 advanced contract', () => {
    it('create cw721 advanced contract', () => {
        cy.visit(Cypress.env('URL') + '/cw721/instantiate')
        cy.loginWithMnemonic(Cypress.env('MNEMONIC_5'), Cypress.env('PASSWORD'))

        // advanced contract 토글 선택
        cy.contains('div', 'ADVANCED')
            .should('be.visible')
            .click()

        // NFT contract name 
        cy.get('input[type="string"][placeholder="ex) MY CW NFT Contract"]')
            .clear()
            .type('My NFT Contract Name advanced 0730')

        // NFT contract symbol 
        cy.get('input[placeholder="ex) MCT, FCT"]')
            .clear()
            .type('MNCN advanced')

        // admin address 
        cy.contains('Admin Address').get('input[type="string"][placeholder="Input wallet Address"]').eq(0)
            .clear()
            .type(Cypress.env('ADDRESS_5'))

        // minter address
        cy.get('input[type="string"][placeholder="Input wallet Address"]').eq(1)
            .clear()
            .type(Cypress.env('ADDRESS_5'))

        cy.get('input[placeholder="ex) Event reward contract"]')
            .clear()
            .type('My NFT Contract Label')

        cy.wait(1000)
        cy.get('span[class="button-text"]').contains('Instantiate')
            .should('not.be.disabled')
            .click()

        cy.wait(1000)
        cy.contains('CW721 Instantiation', { timeout: 10000 }).should('be.visible')

        cy.contains('div', 'CW721 Instantiation')
            .should('be.visible')
            .get('input[type="password"][placeholder="Enter Password"]')
            .clear()
            .type(Cypress.env('PASSWORD'))

        cy.wait(1000)
        cy.get('button').contains('div', 'Confirm').click()

        cy.wait(8000)
        cy.screenshot('create cw721 advanced contract')
    })
})
