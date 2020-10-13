const headerBar = {
   searchingButtonSelector: '.mat-search_icon-search',
   serachingInputSelector: '[id="mat-input-0"]',

   searchingButton(){
      return cy.get(this.searchingButtonSelector)
   },

   serachingInput(){
      return cy.get(this.serachingInputSelector)
   },

   useSearchingTool(input){
      this.searchingButton().click();
      this.serachingInput().clear();
      this.serachingInput().type(input + '{enter}');
   }
}
export default {...headerBar }