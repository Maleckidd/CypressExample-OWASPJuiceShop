const faker = require('faker');

const complaint = {
   complaintMessageInputSelector: '[id="complaintMessage"]',
   uploadFileButtonSelector: 'input[type="file"]',
   submitButtonSelector: '[id="submitButton"]',
   
   complaintMessageInput() {
      return cy.get(this.complaintMessageInputSelector)
   },

   uploadFileInput(){
      return cy.get(this.uploadFileButtonSelector)
   },

   submitButton(){
      return cy.get(this.submitButtonSelector)
   },

   sendComplaint(file) {
      this.complaintMessageInput().type(faker.random.words())
      this.uploadFileInput().attachFile(file)
      this.submitButton().click();
   }
}
export default { ...complaint }