import { recurse } from 'cypress-recurse'

describe('Examples of cypress-recurse extension usage', () => {
  const incorrectUrl = '/ftp/acquisitionsNotExist.md';
  const correctUrl = '/ftp/acquisitions.md'

  context('Cy.request retring till response status code is ok', () => {
    it('Possitive scenario', () => {
      recurse(
        () =>
          cy.request({
            url: correctUrl,
            failOnStatusCode: false
          }),
        (res) => res.isOkStatusCode, { delay: 1000, limit: 3, log: false, },
      ).then(res => {
        cy.log(res.body)
      })
    })

    it('Failing scenario - Recursion limit reached', () => {
      recurse(
        () =>
          cy.request({
            url: incorrectUrl,
            failOnStatusCode: false
          }),
        (res) => res.isOkStatusCode, { delay: 1000, limit: 3, log: true, },
      ).then(res => {
        cy.log(res.body)
      })
    })
  })
})
