import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import headerBar from '../POM/headerBar.pom';
import sideNav from '../POM/sideNav.pom';
import loginPage from '../POM/loginPage.pom';
import scoreBoard from '../POM/ScoreBoard.pom';
import registrationPage from '../POM/registrationPage.pom';
import contactPage from '../POM/contactPage.pom';

describe('OWASP JuiceShop Achivments unlocking Automation', () => {
  context('1 - star vulnerabilities', () => {

    before(() => {
      cy.visit('/');
      cy.wait(2000);
      firstVisitPopups.closeFirstVisitMesseges();
      registrationPage.register();
      loginPage.login(registrationPage.userEmail, registrationPage.userPassword);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('cookieconsent_status', 'welcomebanner_status', 'token', 'language');
      cy.visit('/');
    });

    it('1 - visit /#/score-board', () => {
      cy.visit(scoreBoard.url);
      scoreBoard.checkIsAchivSolvedXHR('Score Board');
    });

    it('2 - Bonus Payload', () => {
      cy.fixture('challengesPayloads.json').then(data => {
        headerBar.useSearchingTool(data.BonusPayload);
      });
      scoreBoard.checkIsAchivSolvedXHR('Bonus Payload');
    });

    it('3 - DOM XSS', () => {
      //Challenge solved - timeout - alert (to fix)
      cy.fixture('challengesPayloads.json').then(data => {
        headerBar.useSearchingTool(data.DOMBasedXSS);
      });
    });

    it("4 - Confidential Document", () => {
      cy.request('/ftp/acquisitions.md');
      scoreBoard.checkIsAchivSolvedXHR('Confidential Document');
    });

    it("5 - Error Handling", () => {
      loginPage.login('\'', 'asd');
      scoreBoard.checkIsAchivSolvedXHR('Error Handling');
    });

    it("6 - Missing Encoding", () => {
      cy.request('/assets/public/images/uploads/%F0%9F%98%BC-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg');
      cy.visit('/');
      scoreBoard.checkIsAchivSolvedXHR('Missing Encoding');
    });

    it("7 - Exposed Metrics", () => {
      cy.request('/metrics');
      scoreBoard.checkIsAchivSolvedXHR('Exposed Metrics');
    });

    it("8 - Outdated Whitelist", () => {
      cy.request('/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm');
      scoreBoard.checkIsAchivSolvedXHR('Outdated Whitelist');
    });

    it("9 - Privacy Policy", () => {
      cy.visit('/#/privacy-security/privacy-policy');
      scoreBoard.checkIsAchivSolvedXHR('Privacy Policy');
    });

    it("10 - Zero Stars", () => {
     cy.intercept('captcha/').as('captcha');
     sideNav.navigateToCustomerFeedback();
     cy.wait('@captcha').then((captcha) => {
      cy.request({
        method: 'POST', 
        url: 'http://localhost:3000/api/Feedbacks/', 
        body: {
          captchaId: captcha.response.body.captchaId,
          captcha: `${captcha.response.body.answer}`,
          comment: "rte (anonymous)",
          rating: 0
        }
      });
     });
     scoreBoard.checkIsAchivSolvedXHR('Zero Stars');
    });

  });
});
