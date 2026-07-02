# CypressExample-OWASPJuiceShop

> E2E test suite for [OWASP Juice Shop][OWASPJS] built with [Cypress][cypress] — from simple UI scenarios to automated unlocking of security challenges (1–3 ⭐). This project later became the starting point for an AI-assisted migration to Playwright.

![Cypress](https://img.shields.io/badge/Cypress-10.2.0-17202C?logo=cypress) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black) ![Pattern](https://img.shields.io/badge/pattern-Page%20Object%20Model-blue)

---

## 🎯 The Problem

OWASP Juice Shop is a deliberately vulnerable e-commerce app used to learn security testing. I wanted more than "happy path" clicks:

- **Full E2E coverage** of typical user journeys (registration, login, basket, contact) on a real, dynamic Angular application.
- **Automated challenge solving** — programmatically executing attacks (XSS, XXE, IDOR, API manipulation) and verifying that Juice Shop actually marked them as solved.
- **A dynamic UI to tame** — the app throws welcome popups and cookie banners at every fresh session, which break tests if you approach them naively.

The challenge wasn't "write a few tests" — it was building a suite that runs cleanly against an aggressively dynamic UI, and that can verify the **effect** of an attack, not just that it was fired.

## 🛠️ How I Approached It

**Page Object Model architecture.** All UI interaction logic lives in `POM/` (9 objects: `loginPage`, `registrationPage`, `headerBar`, `products`, `orders`, `contactPage`, `complaint`, `sideNav`, `FirstVisitPopups`). Tests in `JuiceShopTests/` describe *what* is tested; the POMs know *how*.

**Challenges as code.** Attack payloads were extracted into `fixtures/challengesPayloads.json` plus the `xxe.xml` / `test1.xml` files. Tests are grouped by difficulty:

| Suite | Scenarios | Scope |
|-------|:---------:|-------|
| `1StarChallenges.cy.js` | 16 | Score Board, Bonus Payload, Confidential Document, Error Handling, Exposed Metrics… |
| `2StarsChallenges.cy.js` | 17 | Medium-difficulty challenges |
| `3StarsChallenges.cy.js` | 23 | Advanced attacks (XXE, IDOR, API manipulation) |
| `homePage.cy.js` | 8 | Basic UI actions — reference material |
| `recurseExamples.spec.cy.js` | 2 | Retry patterns with `cypress-recurse` |

**Verify over the network, not the UI.** A key decision: the custom command `cy.checkIsAchivSolvedXHR()` checks challenge status via the API response instead of relying on a UI notification. This is resilient to animations and disappearing toasts.

**Config kept out of the tests.** Environment values live in fixtures (`JuiceShop-dev.json` / `JuiceShop-stag.json`) and are selected with the `--env JuiceShop_ENV` flag, so URLs and credentials aren't hard-coded into the specs. In practice everything ran against a single local Juice Shop instance at `http://localhost:3000/`.

## ⚠️ What Didn't Work

Honest about the limits — because they drove what came next:

- **DOM XSS blocked at the framework level.** The test `it.skip('3 - DOM XSS')` — after firing the XSS, a native `alert()` pops up that Cypress can't dismiss, leading to a timeout. The challenge *does* get solved, but the test can't finish cleanly. Left as `skip` with a comment rather than pretending it passes.
- **Fighting welcome and cookie popups.** Required a dedicated `FirstVisitPopups.pom` and manual cookie preservation (`Cypress.Cookies.preserveOnce`) between tests — brittle and dependent on execution order.
- **JavaScript without types.** Across 9 POMs and dozens of payloads, the lack of types meant a typo in a method name or selector only surfaced at runtime.
- **Single-runner architecture.** Cypress runs inside the browser's event loop — some attacks (those relying on native dialogs or multiple tabs) were hard or impossible to automate.

## 🚀 The Result: AI-Assisted Migration to Playwright

Cypress's limitations became the rationale for migrating to **[PlaywrightExample-OWASPJuiceShop][pw]** — carried out with AI assistance and fully documented.

**What changed:**

| | Cypress (before) | Playwright (after) |
|---|---|---|
| Framework | Cypress 10.2.0 | Playwright 1.58.2 |
| Language | JavaScript (ES6) | **TypeScript** (typed POMs) |
| Selectors | `cy.get('[id=email]')` | web-first **Locators** |
| Page Objects | 9 `.pom.js` files | 7 classes + `BasePage` |
| Test data | `faker` | custom `testDataGenerator` |
| Browsers | Chrome | Chromium + Firefox, in parallel |
| Waiting | explicit `wait`/retry | built-in auto-waiting |

**Migration outcomes:**

- ✅ **Typed code** — selector and method errors caught at compile time, not at runtime.
- ✅ **Web-first assertions** — no more manual cookie management or brittle `wait`s.
- ✅ **Cross-browser and parallel testing** out of the box.
- ✅ **Documented process** — [`MIGRATION_GUIDE.md`][pw], `MIGRATION_SUMMARY.md`, and `QUICK_REFERENCE.md` with a 1:1 mapping of every POM and pattern.

> This repository remains the **original source** of the migration — it shows the starting point and the design decisions that were carried over (and improved) in the Playwright version.

---

## 📦 Setup

Requires [Cypress][cypress] and a running instance of [OWASP Juice Shop](https://github.com/bkimminich/juice-shop).

```sh
git clone https://github.com/Maleckidd/CypressExample-OWASPJuiceShop.git
cd CypressExample-OWASPJuiceShop
npm i
```

**Running the tests:**

```sh
npm run cypress:open          # interactive mode (env: stag)
npm run cypress:headless      # headless in Chrome (env: stag)
npm run cypress:open:dev      # interactive mode (env: dev)
```

Juice Shop runs at `http://localhost:3000/` by default (`baseUrl` in `cypress.config.js`).

## 🗂️ Structure

```
CypressExample-OWASPJuiceShop/
├── JuiceShopTests/     # test suites (challenges 1–3⭐ + homePage)
├── POM/                # Page Object Model (9 objects)
├── fixtures/           # attack payloads, env data, XML files
├── support/            # custom commands (checkIsAchivSolvedXHR)
├── plugins/            # node events config
└── cypress.config.js   # baseUrl, specPattern, viewport
```

---

   [cypress]: <https://www.cypress.io/>
   [OWASPJS]: <https://owasp.org/www-project-juice-shop/>
   [pw]: <https://github.com/Maleckidd/PlaywrightExample-OWASPJuiceShop>
