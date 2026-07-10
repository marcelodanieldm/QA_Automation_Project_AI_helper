# Test Cases - Sauce Demo Login

## Scope

Validate the authentication flow at `https://www.saucedemo.com/` for valid users, locked-out user, invalid credentials, required fields, and basic post-login behavior.

## Observed Test Data

- Base URL: `https://www.saucedemo.com/`
- Username field: `Username`
- Password field: `Password`
- Main action: `Login` button
- Common password: `secret_sauce`
- Accepted users listed by the application:
  - `standard_user`
  - `locked_out_user`
  - `problem_user`
  - `performance_glitch_user`
  - `error_user`
  - `visual_user`

## General Preconditions

- The browser can access `https://www.saucedemo.com/`.
- The login page loads with the visual title `Swag Labs`.
- The login form displays the `Username`, `Password`, and `Login` button.

## Test Cases

### TC-LOGIN-001 - Successful login with standard user

**Priority:** High  
**Type:** Positive

**Data:**

- Username: `standard_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `standard_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user is redirected to `https://www.saucedemo.com/inventory.html`.
- The products page is displayed with the title `Products`.
- The main menu and product list are visible.

### TC-LOGIN-002 - Login rejected for locked-out user

**Priority:** High  
**Type:** Negative

**Data:**

- Username: `locked_out_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `locked_out_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user remains on the login page.
- The message `Epic sadface: Sorry, this user has been locked out.` is displayed.
- The `Products` page is not displayed.

### TC-LOGIN-003 - Login rejected with incorrect password

**Priority:** High  
**Type:** Negative

**Data:**

- Username: `standard_user`
- Password: `bad_password`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `standard_user`.
3. Fill `Password` with `bad_password`.
4. Click `Login`.

**Expected Result:**

- The user remains on the login page.
- The message `Epic sadface: Username and password do not match any user in this service` is displayed.
- The fields are marked with an error state.

### TC-LOGIN-004 - Login rejected without username

**Priority:** High  
**Type:** Negative

**Data:**

- Username: empty
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Leave the `Username` field empty.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user remains on the login page.
- The message `Epic sadface: Username is required` is displayed.
- The fields are marked with an error state.

### TC-LOGIN-005 - Login rejected without password

**Priority:** High  
**Type:** Negative

**Data:**

- Username: `standard_user`
- Password: empty

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `standard_user`.
3. Leave the `Password` field empty.
4. Click `Login`.

**Expected Result:**

- The user remains on the login page.
- The message `Epic sadface: Password is required` is displayed.
- The fields are marked with an error state.

### TC-LOGIN-006 - Login rejected with both fields empty

**Priority:** High  
**Type:** Negative

**Data:**

- Username: empty
- Password: empty

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Leave the `Username` field empty.
3. Leave the `Password` field empty.
4. Click `Login`.

**Expected Result:**

- The user remains on the login page.
- The message `Epic sadface: Username is required` is displayed.
- The fields are marked with an error state.
- This scenario is treated as critical because it validates the default required-field behavior when no credentials are provided.

### TC-LOGIN-007 - Close error message

**Priority:** Medium  
**Type:** UI / Negative

**Data:**

- Username: `standard_user`
- Password: `bad_password`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `standard_user`.
3. Fill `Password` with `bad_password`.
4. Click `Login`.
5. Click the error message close button.

**Expected Result:**

- The error message is no longer displayed.
- The user remains on the login page.
- The `Username`, `Password`, and `Login` button remain available.

### TC-LOGIN-008 - Successful login with problem_user

**Priority:** Medium  
**Type:** Positive

**Data:**

- Username: `problem_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `problem_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user is redirected to `https://www.saucedemo.com/inventory.html`.
- The products page is displayed with the title `Products`.

### TC-LOGIN-009 - Successful login with performance_glitch_user

**Priority:** Medium  
**Type:** Positive / Functional performance

**Data:**

- Username: `performance_glitch_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `performance_glitch_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user is redirected to `https://www.saucedemo.com/inventory.html`.
- The products page is displayed with the title `Products`.
- The automation includes a reasonable wait for the user's possible intentional delay.

### TC-LOGIN-010 - Successful login with error_user

**Priority:** Medium  
**Type:** Positive

**Data:**

- Username: `error_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `error_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user is redirected to `https://www.saucedemo.com/inventory.html`.
- The products page is displayed with the title `Products`.

### TC-LOGIN-011 - Successful login with visual_user

**Priority:** Medium  
**Type:** Positive

**Data:**

- Username: `visual_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Fill `Username` with `visual_user`.
3. Fill `Password` with `secret_sauce`.
4. Click `Login`.

**Expected Result:**

- The user is redirected to `https://www.saucedemo.com/inventory.html`.
- The products page is displayed with the title `Products`.

### TC-LOGIN-012 - Session persistence when returning to authenticated inventory

**Priority:** Low  
**Type:** Session

**Data:**

- Username: `standard_user`
- Password: `secret_sauce`

**Steps:**

1. Navigate to `https://www.saucedemo.com/`.
2. Log in with `standard_user` and `secret_sauce`.
3. Confirm that `Products` is displayed.
4. Reload `https://www.saucedemo.com/inventory.html`.

**Expected Result:**

- The inventory page remains available while the session is active.
- The `Products` title remains visible.

## Suggested Automation Criteria

- Use semantic locators whenever possible:
  - `page.getByPlaceholder('Username')`
  - `page.getByPlaceholder('Password')`
  - `page.getByRole('button', { name: 'Login' })`
- To validate errors, use the error container exposed by the application: `[data-test="error"]`.
- To validate successful login, check URL `/inventory.html` and title `Products`.
- For `performance_glitch_user`, configure a longer wait than for the standard user.