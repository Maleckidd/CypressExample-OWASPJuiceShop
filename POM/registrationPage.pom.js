import headerBar from './headerBar.pom';
import loginPage from './loginPage.pom';

const faker = require('faker');

const registrationPage = {
   emailInputSelector: '[id="emailControl"]',
   passwordInputSelector: '[id="passwordControl"]',
   repasswordInputSelector: '[id="repeatPasswordControl"]',
   passwordAdviceSelector: '[class="mat-slide-toggle-bar"]',
   secQuestionArrowSelector: '[class*="mat-select-arrow-wrapper"]',
   secQuestionSelectElementsSelector: 'mat-option[class*="mat-option"]',
   answerInputSelector: '[id="securityAnswerControl"]',
   registerButtonSelector: '[id="registerButton"]',
   loginLinkSelector: '[id="alreadyACustomerLink"]',
   userEmail: faker.internet.email(),
   userPassword: 'superSecret99.',

   emailInput(){
      return cy.get(this.emailInputSelector)
   },

   passwordInput(){
      return cy.get(this.passwordInputSelector)
   },

   repasswordInput(){
      return cy.get(this.repasswordInputSelector)
   },

   passwordAdviceInput(){
      return cy.get(this.passwordAdviceSelector)
   },

   secQuestionInput(){
      return cy.get(this.secQuestionArrowSelector)
   },

   secQuestionElementsSelect(){
      return cy.get(this.secQuestionSelectElementsSelector)
   },

   answerInput(){
      return cy.get(this.answerInputSelector)
   },

   registerButton(){
      return cy.get(this.registerButtonSelector)
   },

   loginLink(){
      return cy.get(this.loginLinkSelector)
   },

   register(){
      headerBar.accountButton().click();
      headerBar.loginButton().click();
      loginPage.registrationLink().click();
      this.emailInput().type(this.userEmail);
      this.passwordInput().type(this.userPassword);
      this.repasswordInput().type(this.userPassword);
      this.secQuestionInput().click();
      this.secQuestionElementsSelect().contains('What\'s your favorite place to go hiking?').click();
      this.answerInput().type(faker.address.country());
      this.registerButton().click();
   }
}
export default {...registrationPage }