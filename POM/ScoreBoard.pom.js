const scoreBoard = {
   url: '/#/score-board',
   scoreBoardAchivSolvedSelector: '[id="Score Board.solved"]',

   scoreBoardAchivSolved() {
      return cy.get('button[id="Score Board.solved"]').contains('solved')
   },

   checkIsAchivSolvedXHR(name) {
      cy.visit('/')
      cy.server()
      cy.route({url:'/api/Challenges/?sort=name', method:'GET'}).as('getChallenges')
      cy.visit(this.url)
      cy.wait('@getChallenges').then(xhr => {
         const challanges = xhr.response.body.data;
         let obj = challanges.find(o => o.name === name);
         cy.log('Challenge name: ' + obj.name + ', solved: ' + obj.solved)
         expect(obj.solved).to.eql(true)
      })
   }
}
export default { ...scoreBoard }