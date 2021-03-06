import headerBar from '../POM/headerBar.pom';
import registrationPage from '../POM/registrationPage.pom';

const loginPage = {
   emailInputSelector: '[id="email"]',
   passwordInputSelector: '[id="password"]',
   loginButtonSelector: '[id="loginButton"]',
   registrationLinkSelector: '[id="newCustomerLink"] > a',

   registrationLink(){
      return cy.get(this.registrationLinkSelector)
   },

   emailInput(){
      return cy.get(this.emailInputSelector)
   },

   typeEmail(email){
      this.emailInput().clear();
      this.emailInput().type(email)
   },

   passwordInput(){
      return cy.get(this.passwordInputSelector)
   },

   typePassword(password){
      this.passwordInput().clear();
      this.passwordInput().type(password)
   },

   loginButton(){
      return cy.get(this.loginButtonSelector)
   },

   serachingInput(){
      return cy.get(this.serachingInputSelector)
   },

   login(email = registrationPage.userEmail, password = registrationPage.userPassword){
      cy.visit('/');
      headerBar.accountButton().should('be.visible').click();
      headerBar.loginButton().click();
      this.typeEmail(email);
      this.typePassword(password);
      this.loginButton().click();
   }
}
export default {...loginPage }