import headerBar from '../POM/headerBar.pom';

const products = {
    productsTableSelector: '[class="table-container custom-slate"]',
    productsTableElementsSelector: '[class="mat-tooltip-trigger product"]',
    productReviewInputSelector: '[aria-label="Text field to review a product"]',
    submitReviewButtonSelector: '[id="submitButton"]',
    addToBasketButtonSelector: '[aria-label="Add to Basket"]',

    sendReview(productName, reviewText) {
        cy.get(this.productsTableSelector).within(() => {
            cy.get(this.productsTableElementsSelector).contains(productName).click();
        });
        cy.get(this.productReviewInputSelector)
            .clear()
            .type(reviewText);
        cy.get(this.submitReviewButtonSelector).click();
    },

    addToBasket(productName) {
        headerBar.backToHomePageButton().click();
        cy.intercept('POST', '/api/BasketItems/').as('postBasketItems');
        cy.get(this.productsTableSelector)
            .contains(productName)
            .parentsUntil('mat-grid-tile')
            .within(() => {
                cy.get(this.addToBasketButtonSelector).click();
            });
    }
};
export default { ...products };
