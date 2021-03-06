const firstVisitPopups = {
   url: '/',
   cookiesDialogSelector: '[aria-label="cookieconsent"]',
   cookiesConfirmButtonSelector: '.cc-btn',
   cookiesLinkSelector: '.cc-link',
   cookiesMessageSelector: '.cc-message',
   welcomeDialogSelector: '[aria-label="Close Welcome Banner"]',
   welcomeDialogDismissButtonSelector: '.close-dialog',


   cookiesDialog(){
      return cy.get(this.cookiesDialogSelector)
   },

   cookiesConfirmButton(){
      return cy.get(this.cookiesConfirmButtonSelector);
   },

   cookiesLink(){
      return cy.get(this.cookiesLinkSelector);
   },

   cookiesMessage(){
      return cy.get(this.cookiesMessageSelector)
   },

   welcomeDialog(){
      return cy.get(this.welcomeDialogSelector)
   },

   welcomeDialogDismissButton(){
      return cy.get(this.welcomeDialogDismissButtonSelector)
   },

   closeFirstVisitMesseges(){
      cy.get('body')
         .should('be.visible')
         .then(($body) => {
         if ($body.find(this.welcomeDialogDismissButtonSelector).length > 0) {
            this.cookiesConfirmButton().click();
            this.welcomeDialogDismissButton().click();
         }
      });
   }
}
export default {...firstVisitPopups }