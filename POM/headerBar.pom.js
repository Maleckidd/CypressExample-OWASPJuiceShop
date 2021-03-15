const headerBar = {
   searchingButtonSelector: '.mat-search_icon-search',
   serachingInputSelector: '[id="mat-input-0"]',
   accountButtonSelector: '[id="navbarAccount"]',
   loginButtonSelector: '[id="navbarLoginButton"]',
   sideNavButtonSelector: '[aria-label="Open Sidenav"]',
   basketButtonSelector: '[routerlink="/basket"]',

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

   useSearchingTool(input){
      this.searchingButton().click();
      this.serachingInput().clear();
      this.serachingInput().type(`${input}{enter}`);
      cy.wait(2000);
   }
}
export default {...headerBar }