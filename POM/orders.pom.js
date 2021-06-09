import headerBar from './headerBar.pom';

const faker = require('faker');

const orders = {
   addNewAddressButtonSelector: '[routerlink="/address/create"]',
   countryInputSelector: '[data-placeholder="Please provide a country."]',
   nameInputSelector: '[data-placeholder="Please provide a name."]',
   mobileNumberInputSelector: '[data-placeholder="Please provide a mobile number."]',
   zipCodeInputSelector: '[data-placeholder="Please provide a ZIP code."]',
   addressInputSelector: '[data-placeholder="Please provide an address."]',
   cityInputSelector: '[data-placeholder="Please provide a city."]',
   stateInputSelector: '[data-placeholder="Please provide a state."]',
   submitButtonSelector: '[id="submitButton"]',
   checkoutBasketButtonSelector: '[id="checkoutButton"]',
   tableRowSelector: 'mat-table > mat-row',
   proceedToPaymentButtonSelector: '[aria-label="Proceed to payment selection"]',
   proceedToDeliveryButtonSelector: '[aria-label="Proceed to delivery method selection"]',
   completeYourPurchaseButtonSelector: '[aria-label="Complete your purchase"]',
   payUsingWalletButtonSelector: '[class*="custom-card"] > div > div > button',

   addNewAddress() {
      headerBar.navigateToMySavedAddresses();
      cy.get(this.addNewAddressButtonSelector).click();
      cy.get(this.countryInputSelector).type(faker.address.country());
      cy.get(this.nameInputSelector).type(faker.name.lastName());
      cy.get(this.mobileNumberInputSelector).type('10000000');
      cy.get(this.zipCodeInputSelector).type('33333');
      cy.get(this.addressInputSelector).type(faker.address.streetAddress());
      cy.get(this.cityInputSelector).type(faker.address.city());
      cy.get(this.stateInputSelector).type(faker.address.state());
      cy.get(this.submitButtonSelector).click();
   },

   placeOrder() {
      headerBar.basketButon().click();
      cy.get(this.checkoutBasketButtonSelector).click();
      cy.get(this.tableRowSelector).first().click();
      cy.get(this.proceedToPaymentButtonSelector).click();
      cy.get(this.tableRowSelector).first().click();
      cy.get(this.proceedToDeliveryButtonSelector).click();
      cy.get(this.payUsingWalletButtonSelector).click();
      cy.get(this.completeYourPurchaseButtonSelector).click();
   }
}
export default { ...orders }