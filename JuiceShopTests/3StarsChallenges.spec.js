import firstVisitPopups from '../POM/FirstVisitPopups.pom';
import registrationPage from '../POM/registrationPage.pom';


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
          role : 'admin',
        }
      });
      cy.checkIsAchivSolvedXHR('Admin Registration');
    });
  });
});
