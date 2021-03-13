import headerBar from '../POM/headerBar.pom';

const sideNav = {
   customerFeedbackButtonSelector: 'a[routerlink="/contact"]',

   customerFeedbackButton(){
      return cy.get(this.customerFeedbackButtonSelector)
   },

   navigateToCustomerFeedback(){
      headerBar.openSideNavButton().click();
      this.customerFeedbackButton().click();
   }
}
export default {...sideNav }
