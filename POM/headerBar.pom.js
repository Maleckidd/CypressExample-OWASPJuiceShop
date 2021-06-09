const headerBar = {
   searchingButtonSelector: '.mat-search_icon-search',
   serachingInputSelector: '[id="mat-input-0"]',
   accountButtonSelector: '[id="navbarAccount"]',
   loginButtonSelector: '[id="navbarLoginButton"]',
   sideNavButtonSelector: '[aria-label="Open Sidenav"]',
   basketButtonSelector: '[routerlink="/basket"]',
   ordersPaymentButtonSelector: 'div > div > [aria-label="Show Orders and Payment Menu"]',
   mySavedAddressesButtonSelector: '[routerlink="/address/saved"]',
   backToHomePageButtonSelector: '[aria-label="Back to homepage"]',

   accountButton(){
      return cy.get(this.accountButtonSelector)
   },

   loginButton(){
      return cy.get(this.loginButtonSelector)
   },

   searchingButton(){
      return cy.get(this.searchingButtonSelector)
   },

   serachingInput(){
      return cy.get(this.serachingInputSelector)
   },

   sideNavButton(){
      return cy.get(this.sideNavButtonSelector)
   },

   basketButon(){
      return cy.get(this.basketButtonSelector)
   },

   ordersPaymentButton(){
      return cy.get(this.ordersPaymentButtonSelector)
   },

   mySavedAddressesButton(){
      return cy.get(this.mySavedAddressesButtonSelector)
   },

   backToHomePageButton(){
      return cy.get(this.backToHomePageButtonSelector)
   },

   navigateToMySavedAddresses(){
      this.accountButton().click();
      this.ordersPaymentButton().trigger('mouseenter');
      this.mySavedAddressesButton().click();
   },

   navigateToBasket(){
      cy.intercept('GET', '/rest/basket/**').as('getBasket');
      this.basketButon().click();
      return cy.wait('@getBasket')
   },

   useSearchingTool(input){
      this.searchingButton().click();
      this.serachingInput().clear();
      this.serachingInput().type(`${input}{enter}`);
      cy.wait(2000);
   }
}
export default {...headerBar }