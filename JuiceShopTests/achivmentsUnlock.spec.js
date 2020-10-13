import firstVisitPopups from '../POM/HomePage/FirstVisitPopups.pom';
import headerBar from '../POM/HomePage/headerBar.pom';
import scoreBoard from '../POM/ScoreBoard/ScoreBoard.pom';

describe('OWASP JuiceShop Achivments unlocking Automation', () => {
 
  context('1 - star vulnerabilities', () => {
    beforeEach(() => {
      cy.visit('');
      firstVisitPopups.closeFirstVisitMesseges()
    });

    it('1 - visit /#/score-board', () => {
      cy.visit(scoreBoard.url)
      scoreBoard.checkIsAchivSolvedXHR('Score Board')
    })

    it.only('2 - Bonus Payload', () => {
      cy.visit('/')
      cy.fixture('challengesPayloads.json').then(data => {
      headerBar.useSearchingTool(data.BonusPayload);
      })
      scoreBoard.checkIsAchivSolvedXHR('Bonus Payload')
    })
  })
});