import headerBar from '../POM/headerBar.pom';

const sideNav = {
   customerFeedbackButtonSelector: 'a[routerlink="/contact"]',
   supportChatButtonSelector: 'a[routerlink="/chatbot"]',
   complaintButtonSelector: 'a[routerlink="/complain"]',

   customerFeedbackButton(){
      return cy.get(this.customerFeedbackButtonSelector)
   },

   supportChatButton(){
      return cy.get(this.supportChatButtonSelector)
   },

   complaintButton(){
      return cy.get(this.complaintButtonSelector)
   },

   navigateToComplaint(){
      headerBar.sideNavButton().click();
      this.complaintButton().click();   
   },

   navigateToCustomerFeedback(){
      headerBar.sideNavButton().click();
      this.customerFeedbackButton().click();
   }
}
export default {...sideNav }
