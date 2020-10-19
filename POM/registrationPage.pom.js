import headerBar from './headerBar.pom';
import loginPage from './loginPage.pom';

const registrationPage = {
   emailInputSelector: '[id="emailControl"]',
   passwordInputSelector: '[id="passwordControl"]',
   repasswordInputSelector: '[id="repeatPasswordControl"]',
   passwordAdviceSelector: '[class="mat-slide-toggle-bar"]',
   secQuestionSelectSelector: '[id="mat-select-2"]',
   answerInputSelector: '[id="securityAnswerControl"]',
   registerButtonSelector: '[id="registerButton"]',
   loginLinkSelector: '[id="alreadyACustomerLink"]',

   emailInput(){
      return cy.get(emailInputSelector)
   },

   passwordInput(){
      return cy.get(passwordInputSelector)
   },

   repasswordInput(){
      return cy.get(repasswordInputSelector)
   },

   passwordAdvice(){
      return cy.get(passwordAdviceSelector)
   },

   secQuestionSelect(){
      return cy.get(secQuestionSelectSelector)
   },

   answerInput(){
      return cy.get(answerInputSelector)
   },

   registerButton(){
      return cy.get(registerButtonSelector)
   },

   loginLink(){
      return cy.get(loginLinkSelector)
   },

   register(){
      headerBar.accountButton().click();
      headerBar.loginButton().click();
      loginPage.registrationLink().click();
   }
}
export default {...registrationPage }