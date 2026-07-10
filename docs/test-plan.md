# Test Plan - Sauce Demo Login Flow

## 1. Objective

Define the automation strategy for validating the Sauce Demo login flow at `https://www.saucedemo.com/`, based on the approved test cases in `docs/test-cases/login-test-cases.md`.

The goal is to automate the highest-value authentication scenarios with Playwright and TypeScript, using stable semantic locators and a Page Object Model structure.

## 2. Scope

### In Scope

- Login page availability and core UI elements.
- Successful login for accepted users.
- Rejected login for locked-out user.
- Rejected login for invalid credentials.
- Required-field validation for empty username and password.
- Error message close behavior.
- Session persistence after successful authentication.
- Special handling for `performance_glitch_user` due to intentional delay.

### Out of Scope

- Product catalog validation beyond confirming successful navigation to `Products`.
- Cart, checkout, sorting, product details, and logout flows.
- Visual regression testing for `visual_user` beyond login access confirmation.
- Backend API validation, database checks, and security penetration testing.
- Cross-browser certification unless explicitly requested in a later phase.

## 3. References

- Test cases: `docs/test-cases/login-test-cases.md`
- Target application: `https://www.saucedemo.com/`
- Expected successful destination: `https://www.saucedemo.com/inventory.html`

## 4. Test Data

| User | Password | Expected Outcome |
| --- | --- | --- |
| `standard_user` | `secret_sauce` | Successful login |
| `locked_out_user` | `secret_sauce` | Locked-out error |
| `problem_user` | `secret_sauce` | Successful login |
| `performance_glitch_user` | `secret_sauce` | Successful login with longer wait |
| `error_user` | `secret_sauce` | Successful login |
| `visual_user` | `secret_sauce` | Successful login |
| `standard_user` | `bad_password` | Invalid credentials error |
| empty | `secret_sauce` | Username required error |
| `standard_user` | empty | Password required error |
| empty | empty | Username required error |

## 5. Automation Strategy

### Framework

- Use Playwright with TypeScript.
- Use Page Object Model to isolate page actions and assertions.
- Keep login-specific behavior in a dedicated page object under `src/pages/`.
- Keep login specs under `src/tests/`.

### Locator Strategy

- Prefer semantic locators:
  - `page.getByPlaceholder('Username')`
  - `page.getByPlaceholder('Password')`
  - `page.getByRole('button', { name: 'Login' })`
- Use stable application attributes only where semantic locators are insufficient:
  - `[data-test="error"]`
  - `[data-test="title"]`
- Avoid dynamic IDs, brittle CSS chains, and XPath.

### Assertion Strategy

- Validate successful login with both URL and visible page title:
  - URL contains `/inventory.html`.
  - `Products` is visible.
- Validate failed login with:
  - User remains on the login page.
  - Expected error text is visible.
- Validate empty-field scenarios by checking the exact application error message.
- Validate error dismissal by confirming the error container is no longer visible.

### Test Organization

Recommended files for Phase 3:

- `src/pages/LoginPage.ts`
- `src/pages/InventoryPage.ts`
- `src/tests/login.spec.ts`

Recommended grouping:

- `describe('Login - positive scenarios')`
- `describe('Login - negative scenarios')`
- `describe('Login - UI behavior')`
- `describe('Login - session behavior')`

## 6. Execution Approach

### Priority 1 - Smoke Coverage

- TC-LOGIN-001: Successful login with `standard_user`.
- TC-LOGIN-002: Locked-out user rejection.
- TC-LOGIN-003: Invalid password rejection.
- TC-LOGIN-004: Missing username validation.
- TC-LOGIN-005: Missing password validation.
- TC-LOGIN-006: Both fields empty validation.

### Priority 2 - Extended Functional Coverage

- TC-LOGIN-007: Close error message.
- TC-LOGIN-008: Successful login with `problem_user`.
- TC-LOGIN-009: Successful login with `performance_glitch_user`.
- TC-LOGIN-010: Successful login with `error_user`.
- TC-LOGIN-011: Successful login with `visual_user`.

### Priority 3 - Session Coverage

- TC-LOGIN-012: Session persistence after reload.

## 7. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| `performance_glitch_user` responds slowly by design | Flaky timeout failures | Configure a longer timeout only for this scenario |
| External demo site availability may vary | False negatives unrelated to code | Keep retries limited and capture traces/screenshots on failure |
| Error message text may change | Assertion failures | Assert exact text for now because messages are part of the user-facing behavior |
| Session state may leak between tests | Unreliable results | Start each test with a clean browser context or navigate fresh to the login page |
| Non-semantic locators may become brittle | Maintenance overhead | Use semantic locators first and stable `data-test` attributes only for assertions |

## 8. Entry Criteria

- Approved login test cases exist in `docs/test-cases/login-test-cases.md`.
- Playwright and TypeScript project structure is available.
- Target site is reachable from the test environment.
- Human approval is provided to proceed from Test Plan to Code Implementation.

## 9. Exit Criteria

- Login automation code is implemented using Page Object Model.
- All priority 1 scenarios are automated.
- Priority 2 and priority 3 scenarios are automated unless explicitly deferred.
- Tests can be executed with `npx playwright test` after human approval.
- Failures include actionable assertion messages, traces, or screenshots according to Playwright configuration.

## 10. Traceability Matrix

| Test Case ID | Automation Priority | Proposed Spec Area |
| --- | --- | --- |
| TC-LOGIN-001 | P1 | Positive login |
| TC-LOGIN-002 | P1 | Negative login |
| TC-LOGIN-003 | P1 | Negative login |
| TC-LOGIN-004 | P1 | Required fields |
| TC-LOGIN-005 | P1 | Required fields |
| TC-LOGIN-006 | P1 | Required fields |
| TC-LOGIN-007 | P2 | UI behavior |
| TC-LOGIN-008 | P2 | Positive login |
| TC-LOGIN-009 | P2 | Positive login / timeout handling |
| TC-LOGIN-010 | P2 | Positive login |
| TC-LOGIN-011 | P2 | Positive login |
| TC-LOGIN-012 | P3 | Session behavior |

## 11. Deliverables for Phase 3

- Login Page Object with actions and assertions.
- Inventory Page Object with inventory landing assertions.
- Login spec file covering the approved scenarios.
- Playwright execution evidence after explicit human authorization to execute.