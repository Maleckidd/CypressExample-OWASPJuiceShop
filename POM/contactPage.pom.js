const faker = require('faker');

let captchaResoult = null;

const contactPage = {
   commentInputSelector: '[id="comment"]',
   captchaControlInputSelector: '[id="captchaControl"]',
   captchaTaskSelector: '[id="captcha"]',
   submitButtonSelector:  'button[type="submit"] > span[matripple]',
   ratingSliderSelector: '[class="mat-slider-thumb"]',

   commentInput(){
      return cy.get(this.commentInputSelector)
   },

   captchaControlInput(){
      return cy.get(this.captchaControlInputSelector)
   },

   captchaTask(){
      return cy.get(this.captchaTaskSelector)
   },

   ratingSlider(){
      return cy.get(this.ratingSliderSelector)
   },

   submitButton(){
      return cy.get(this.submitButtonSelector)
   },

   sendCustomerFeedback(captchaAnswer){
      this.commentInput().type(faker.random.word());
      this.ratingSlider().click({ force: true });
      this.captchaControlInput().type(captchaAnswer);
      /*this.captchaTask().invoke('text').then(text => {
         captchaResoult = eval(text);
         this.captchaControlInput().type(eval(text));
      });*/
      this.submitButton().click({ force:true });
   },
}
export default {...contactPage }
