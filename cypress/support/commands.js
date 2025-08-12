// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login with mnemonic
Cypress.Commands.add('loginWithMnemonic', (mnemonic, password) => {
  // 매개변수 검증
  if (!password) {
    throw new Error(`PASSWORD is ${password}! Check environment variables.`)
  }
  
  // Connect Wallet 버튼 클릭
  cy.contains('Connect Wallet').click()
  cy.wait(1000)
  // Mnemonic 입력란에 니모닉 값 입력
  cy.get('textarea[placeholder="Enter Mnemonic"]')
    .clear()
    .type(mnemonic)
  
  // 첫 번째 비밀번호 입력란
  cy.get('input[type="password"]').eq(0)
    .clear()
    .type(password)
  
  // 두 번째 비밀번호 입력란 (확인용)
  cy.get('input[type="password"]').eq(1)
    .clear()
    .type(password)

  // 로그인 버튼 클릭
  cy.get('button').contains('Login').click()
})

//search and select CW20 token
Cypress.Commands.add('searchAndSelectToken', (tokenAddress) => {
  cy.get('input[type="text"][placeholder="Search by Token Name / Symbol / Label / Address"]')
  .clear()
  .type(tokenAddress)

  cy.wait(5000)
  cy.get('span[class="highlight"]')
  .contains(tokenAddress)
  .click()
})

Cypress.Commands.add('searchAndSelectNFT_cw721', (NFT_CONTRACT_ADDRESS) => {
  cy.get('input[type="text"][placeholder="Search by NFT Contract Name / Symbol / Label / Address"]')
  .clear()
  .type(NFT_CONTRACT_ADDRESS)

  cy.wait(5000)
  cy.get('span[class="highlight"]')
  .contains(NFT_CONTRACT_ADDRESS)
  .click()
})

//QR - wallet connect
Cypress.Commands.add('walletConnectViaQR', () => {

  cy.intercept('GET', '**/connect/requests/**').as('connectStatus')
    
  // 페이지 방문 및 지갑 연결 시작
  cy.visit('https://craft-cw-testnet.firmachain.dev/instantiate')
  cy.contains('Connect Wallet').click()
  
  // QR 코드 표시 확인 및 스크린샷
  cy.get('#react-qrcode-logo', { timeout: 10000 })
    .should('be.visible')
  
  // 수동 스캔 안내
  cy.log('📱 QR Code is displayed! Please scan with your mobile wallet')
  cy.log('⏳ Test will wait for connection approval...')
  
  // 연결 성공을 기다림 (간단한 방법)
  cy.wait('@connectStatus', { timeout: 120000 }).then((interception) => {
    const response = interception.response.body
    cy.log('📡 First API response:', response)
    
    // 성공 여부 체크
    if (response.code === 0 && 
        response.message === "success" && 
        response.result?.status === "1") {
      
      cy.log('🎉 Wallet connection SUCCESS!')
      cy.log('💼 Connected wallet:', response.result.signer)
      cy.screenshot('wallet-connected-success')
      
    } else {
      cy.log('⏳ First check shows pending, continuing to wait...')
      
      // 두 번째 시도
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
  
  // 연결 완료 후 UI 변화 확인
  // "Connect to Mobile" 타이틀이 들어간 모달이 사라지는지 확인
  cy.get('body', { timeout: 30000 }).should('not.contain', 'Connect to Mobile')
  cy.log('✅ Connect Wallet button disappeared - connection successful!')
})



//execute qr verification
Cypress.Commands.add('QR_verification', () => {

  //cy.intercept('GET', '**/connect/requests/**').as('connectStatus')
    
  // 수동 스캔 안내
  cy.log('📱 QR Code is displayed! Please scan with your mobile wallet')
  cy.log('⏳ Test will wait for connection approval...')
  
  // 연결 성공을 기다림 (간단한 방법)
  cy.wait('@connectStatus', { timeout: 120000 }).then((interception) => {
    const response = interception.response.body
    cy.log('📡 First API response:', response)
    
    // 성공 여부 체크
    if (response.code === 0 && 
        response.message === "success" && 
        response.result?.status === "1") {
      
      cy.log('🎉 Wallet connection SUCCESS!')
      cy.log('💼 Connected wallet:', response.result.signer)
      cy.screenshot('wallet-connected-success')
      
    } else {
      cy.log('⏳ First check shows pending, continuing to wait...')
      
      // 두 번째 시도
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
  
  // 연결 완료 후 UI 변화 확인
  // "Connect to Mobile" 타이틀이 들어간 모달이 사라지는지 확인
  cy.get('body', { timeout: 30000 }).should('not.contain', 'Connect to Mobile')
  cy.log('✅ Connect Wallet button disappeared - connection successful!')
})