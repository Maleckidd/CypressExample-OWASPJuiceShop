const resetPassword = {
   emailInputSelector: '[id="email"]',
   passwordInputSelector: '[id="password"]',
   securityAnswerInputSelector: '[id="securityAnswer"]',
   newPasswordInputSelector: '[id="newPassword"]',
   newPasswordRepeatInputSelector: '[id="newPasswordRepeat"]',
   resetButtonSelector: '[id="resetButton"]',

   emailInput() {
      return cy.get(this.emailInputSelector)
   },

   securityAnswerInput() {
      return cy.get(this.securityAnswerInputSelector)
   },

   newPasswordInput() {
      return cy.get(this.newPasswordInputSelector)
   },

   newPasswordRepeatInput() {
      return cy.get(this.newPasswordRepeatInputSelector)
   },

   resetButton() {
      return cy.get(this.resetButtonSelector)
   },

   typeEmail(email) {
      this.emailInput().clear();
      this.emailInput().type(email)
   },

   typeSecurityAnswer(secAnswer) {
      this.securityAnswerInput().clear();
      this.securityAnswerInput().type(secAnswer)
   },

   typeNewPassword(newPassword) {
      this.newPasswordInput().clear();
      this.newPasswordInput().type(newPassword)
   },

   typeNewPasswordRepeat(newPassword) {
      this.newPasswordRepeatInput().clear();
      this.newPasswordRepeatInput().type(newPassword)
   },

   clickResetButton() {
      this.resetButton().click();
   },

   resetPassword(email, newPassword, securityAnswer) {
      cy.visit('#/forgot-password');
      this.typeEmail(email);
      this.typeSecurityAnswer(securityAnswer);
      this.typeNewPassword(newPassword);
      this.typeNewPasswordRepeat(newPassword);
      this.clickResetButton();
   }
}
export default { ...resetPassword }