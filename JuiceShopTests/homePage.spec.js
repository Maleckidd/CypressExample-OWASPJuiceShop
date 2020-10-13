import firstVisitPopups from '../POM/HomePage/FirstVisitPopups.pom';

describe('HomePage Test Automatisation demo', () => {

  before(() =>{
    cy.fixture('JuiceShop-' + Cypress.env('JuiceShop_ENV')).then(data => {
      cy.log('Test enviroment: ' + data.envType)
    })
  })

  context('Welcome popups - elements check', () => {

    beforeEach(() => {
      cy.visit('');
    });

    it('Cookie toast - text', () => {
      cy.fixture('/POM/FirstVisitPopup.pom.json').then(data => {
        firstVisitPopups.cookiesMessage()
          .should('be.visible')
          .and('have.text', data.cookieToast.messageCookies);
      })
    })

    it('Cookie toast - link', () => {
      cy.fixture('/POM/FirstVisitPopup.pom.json').then(data => {
        firstVisitPopups.cookiesLink()
          .should('be.visible')
          .should('have.attr', 'href', data.cookieToast.linkCookies);
      })
    })

    it('Cookie toast - confirming button click', () => {
      firstVisitPopups.cookiesConfirmButton()
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    })

    it('Cookie toast - confirming button text', () => {
      cy.fixture('/POM/FirstVisitPopup.pom.json').then(data => {
        firstVisitPopups.cookiesConfirmButton()
          .should('be.visible')
          .and('have.text', data.cookieToast.buttonText)
      })
    })

    it('Cookie toast - confirming button text', () => {
      cy.fixture('/POM/FirstVisitPopup.pom.json').then(data => {
        firstVisitPopups.cookiesConfirmButton()
          .should('be.visible')
          .and('have.text', data.cookieToast.buttonText)
      })
    })

    it('Welcome popup - dismiss button text and icon', () => {
      cy.fixture('/POM/FirstVisitPopup.pom.json').then(data => {
        firstVisitPopups.welcomeDialogDismissButton()
          .should('be.visible')
          .and('have.text', data.welcomePopup.dismissButtonText)
      })
    })

    it('Welcome popup - dismiss button click', () => {
      firstVisitPopups.welcomeDialogDismissButton()
        .should('be.visible')
        .click()
      firstVisitPopups.welcomeDialog()
        .should('be.not.visible')
    })
  })

  context('HomePage - elements check', () => {

    beforeEach(() => {
      cy.visit('');
      firstVisitPopups.closeFirstVisitMesseges()
    });

    it('Welcome page', () => {
      
    })
  })
})
