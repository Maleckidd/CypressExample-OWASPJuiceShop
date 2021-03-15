import headerBar from '../POM/headerBar.pom';

const sideNav = {
   customerFeedbackButtonSelector: 'a[routerlink="/contact"]',
   supportChatButtonSelector: 'a[routerlink="/chatbot"]',

   customerFeedbackButton(){
      return cy.get(this.customerFeedbackButtonSelector)
   },

   supportChatButton(){
      return cy.get(this.supportChatButtonSelector)
   },

   navigateToCustomerFeedback(){
      headerBar.sideNavButton().click();
      this.customerFeedbackButton().click();
   }
}
export default {...sideNav }
