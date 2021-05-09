// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('checkIsAchivSolvedXHR', (challengeName) => {
  cy.visit('/');
  cy.server();
  cy.route({ url: '/api/Challenges/?sort=name', method: 'GET' }).as('getChallenges');
  cy.visit('/#/score-board');
  cy.wait('@getChallenges').then(xhr => {
    const challanges = xhr.response.body.data;
    let obj = challanges.find(o => o.name === challengeName);
    cy.log('Challenge name: ' + obj.name + ', solved: ' + obj.solved);
    expect(obj.solved).to.eql(true);
  });
});
