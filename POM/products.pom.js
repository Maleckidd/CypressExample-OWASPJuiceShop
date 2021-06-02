const products = {
    productsTableSelector: '[class="table-container custom-slate"]',
    productsTableElementsSelector: '[class="mat-tooltip-trigger product"]',
    productReviewInputSelector: '[aria-label="Text field to review a product"]',
    submitReviewButtonSelector: '[id="submitButton"]',

    sendReview(productName, reviewText) {
        cy.get(this.productsTableSelector).within(() => {
            cy.get(this.productsTableElementsSelector).contains(productName).click();
        });
        cy.get(this.productReviewInputSelector)
            .clear()
            .type(reviewText);
        cy.get(this.submitReviewButtonSelector).click();
    }
};
export default { ...products };
