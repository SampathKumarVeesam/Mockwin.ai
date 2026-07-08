// // tests/b2b/auth/loginPage.spec.js

// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../../../src/pages/b2b/auth/loginPage.js');
// const fs = require('fs');
// const path = require('path');

// // ==========================================
// // LOAD .ENV IN TEST FILE (AS BACKUP)
// // ==========================================

// function loadEnvForTest() {
//     try {
//         // Find .env from project root
//         const projectRoot = path.resolve(__dirname, '../../..');
//         const envPath = path.join(projectRoot, '.env');
        
//         console.log(`Test file looking for .env at: ${envPath}`);
        
//         if (!fs.existsSync(envPath)) {
//             console.log('.env file not found in test file');
//             return;
//         }

//         const envContent = fs.readFileSync(envPath, 'utf8');
//         const lines = envContent.split('\n');
        
//         for (const line of lines) {
//             const trimmed = line.trim();
//             if (trimmed.startsWith('#') || trimmed === '') continue;

//             const equalsIndex = trimmed.indexOf('=');
//             if (equalsIndex === -1) continue;

//             const key = trimmed.substring(0, equalsIndex).trim();
//             let value = trimmed.substring(equalsIndex + 1).trim();

//             if ((value.startsWith('"') && value.endsWith('"')) || 
//                 (value.startsWith("'") && value.endsWith("'"))) {
//                 value = value.substring(1, value.length - 1);
//             }

//             if (key && value && !process.env[key]) {
//                 process.env[key] = value;
//             }
//         }

//         console.log('.env loaded in test file');
        
//     } catch (error) {
//         console.warn('Error loading .env in test:', error.message);
//     }
// }

// // Load .env
// loadEnvForTest();

// // ==========================================
// // CONFIGURATION FROM ENVIRONMENT
// // ==========================================

// const PORTAL_URL = process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai';

// // ==========================================
// // TEST DATA - MUST COME FROM .env
// // ==========================================

// console.log('\n' + '='.repeat(60));
// console.log('ENVIRONMENT VARIABLES CHECK:');
// console.log(`COMPANY_PORTAL_URL: ${process.env.COMPANY_PORTAL_URL || 'NOT SET'}`);
// console.log(`COMPANY_ADMIN_EMAIL: ${process.env.COMPANY_ADMIN_EMAIL || 'NOT SET'}`);
// console.log(`COMPANY_ADMIN_PASSWORD: ${process.env.COMPANY_ADMIN_PASSWORD ? '***' : 'NOT SET'}`);
// console.log('='.repeat(60) + '\n');

// // READ FROM .env - NO FALLBACKS (must come from .env)
// const validCredentials = {
//     email: process.env.COMPANY_ADMIN_EMAIL,
//     password: process.env.COMPANY_ADMIN_PASSWORD
// };

// // Check if credentials exist
// if (!validCredentials.email || !validCredentials.password) {
//     console.error('ERROR: Credentials not found in .env file!');
//     console.error('Please make sure your .env file contains:');
//     console.error('COMPANY_ADMIN_EMAIL=your_email@example.com');
//     console.error('COMPANY_ADMIN_PASSWORD=your_password');
//     console.error('\nCurrent values:');
//     console.error(`COMPANY_ADMIN_EMAIL: ${validCredentials.email || 'NOT SET'}`);
//     console.error(`COMPANY_ADMIN_PASSWORD: ${validCredentials.password ? '***' : 'NOT SET'}`);
//     process.exit(1);
// }

// console.log('Valid credentials loaded from .env');
// console.log(`Email: ${validCredentials.email}`);
// console.log(`Password: ${validCredentials.password ? '***' : 'NOT SET'}\n`);

// const invalidCredentials = {
//     email: 'invalid@mockwin.ai',
//     password: 'wrongpassword'
// };

// // ==========================================
// // TEST SUITE
// // ==========================================

// test.describe('Company Login Tests', () => {
    
//     let loginPage;

//     test.beforeEach(async ({ page }) => {
//         test.setTimeout(60000);
        
//         loginPage = new LoginPage(page);
        
//         console.log(`\nNavigating to login page: ${PORTAL_URL}/company/login`);
        
//         await loginPage.goTo(PORTAL_URL);
//         await page.waitForLoadState('networkidle', { timeout: 30000 });
//         await loginPage.checkPageLoaded();
        
//         console.log('Login page loaded successfully');
//         console.log('='.repeat(60));
//         console.log(`TEST STARTED: ${test.info().title}`);
//         console.log('='.repeat(60));
//     });

//     // ==========================================
//     // TEST 1: Successful Login
//     // ==========================================

//     test('TC-1: Company admin can login successfully', async ({ page }) => {
//         console.log('\nTEST: Successful Login');
//         console.log('-'.repeat(40));
        
//         console.log(`Using email from .env: ${validCredentials.email}`);
        
//         await loginPage.takeScreenshot('before-login');
        
//         console.log('Step 1: Logging in with valid credentials...');
//         await loginPage.login(
//             validCredentials.email,
//             validCredentials.password
//         );

//         console.log('Step 2: Verifying successful login...');
//         await loginPage.verifySuccessfulLogin();
        
//         await loginPage.takeScreenshot('after-login');
        
//         console.log('\n TEST PASSED: Login successful.');
//     });

//     // ==========================================
//     // TEST 2: Login Page Load
//     // ==========================================

//     test('TC-2: Login page loads correctly', async ({ page }) => {
//         console.log('\nTEST: Login Page Load');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Verifying login page elements...');
//         await loginPage.checkPageLoaded();
        
//         console.log('\n TEST PASSED: Login page loaded correctly.');
//     });

//     // ==========================================
//     // TEST 3: Navigate to Registration
//     // ==========================================

//     test('TC-3: Click "Create account" link navigates to registration', async ({ page }) => {
//         console.log('\nTEST: Navigate to Registration');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Clicking "Create account" link...');
//         await loginPage.clickCreateAccountLink();

//         console.log('Step 2: Verifying registration page...');
//         await expect(page).toHaveURL(/.*company\/register/, { timeout: 10000 });
        
//         const registerHeading = page.getByRole('heading', { name: 'Create your company account' });
//         await expect(registerHeading).toBeVisible({ timeout: 10000 });
        
//         console.log('\n TEST PASSED: Navigated to registration page.');
//     });

//     // ==========================================
//     // TEST 4: Invalid Login
//     // ==========================================

//     test('TC-4: Invalid login shows error message', async ({ page }) => {
//         console.log('\nTEST: Invalid Login');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Logging in with invalid credentials...');
//         await loginPage.login(
//             invalidCredentials.email,
//             invalidCredentials.password
//         );

//         console.log('Step 2: Verifying error message...');
//         await loginPage.verifyLoginFailure('Invalid credentials');
        
//         console.log('\n TEST PASSED: Invalid login handled correctly.');
//     });

//     // ==========================================
//     // TEST 5: Empty Email Validation
//     // ==========================================

//     test('TC-5: Empty email shows validation error', async ({ page }) => {
//         console.log('\nTEST: Empty Email Validation');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Clearing email field...');
//         await loginPage.clearForm();
        
//         console.log('Step 2: Attempting to submit with empty email...');
//         await loginPage.passwordInput.fill('somepassword');
//         await loginPage.signInButton.click();
        
//         await page.waitForTimeout(1000);
        
//         console.log('Step 3: Verifying still on login page...');
//         await expect(page).toHaveURL(/.*login/);
        
//         console.log('\n TEST PASSED: Empty email validation works.');
//     });

//     // ==========================================
//     // TEST 6: Empty Password Validation
//     // ==========================================

//     test('TC-6: Empty password shows validation error', async ({ page }) => {
//         console.log('\nTEST: Empty Password Validation');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Clearing password field...');
//         await loginPage.clearForm();
        
//         await loginPage.emailInput.fill('test@mockwin.ai');
        
//         console.log('Step 2: Attempting to submit with empty password...');
//         await loginPage.signInButton.click();
        
//         await page.waitForTimeout(1000);
        
//         console.log('Step 3: Verifying still on login page...');
//         await expect(page).toHaveURL(/.*login/);
        
//         console.log('\n TEST PASSED: Empty password validation works.');
//     });

//     // ==========================================
//     // TEST 7: Password Visibility Toggle
//     // ==========================================

//     test('TC-7: Password visibility toggle works', async ({ page }) => {
//         console.log('\nTEST: Password Visibility Toggle');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Typing password...');
//         await loginPage.passwordInput.fill('TestPassword123');
        
//         let fieldType = await loginPage.passwordInput.getAttribute('type');
//         console.log(`Initial password type: ${fieldType}`);
        
//         console.log('Step 2: Toggling password visibility...');
        
//         const showButton = page.locator('button[aria-label="Show password"]');
//         const hideButton = page.locator('button[aria-label="Hide password"]');
        
//         if (await showButton.isVisible()) {
//             await showButton.click();
//             console.log('Clicked Show password button');
//         } else if (await hideButton.isVisible()) {
//             await hideButton.click();
//             console.log('Clicked Hide password button');
//         } else {
//             console.log('Warning: No password toggle button found');
//         }
        
//         const newType = await loginPage.passwordInput.getAttribute('type');
//         console.log(`New password type: ${newType}`);
        
//         expect(newType).not.toBe(fieldType);
        
//         console.log('\n TEST PASSED: Password visibility toggle works.');
//     });

//     // ==========================================
//     // TEST 8: Forgot Password Navigation
//     // ==========================================

//     test('TC-8: Click "Forgot password" link navigates to reset page', async ({ page }) => {
//         console.log('\nTEST: Forgot Password Navigation');
//         console.log('-'.repeat(40));
        
//         console.log('Step 1: Clicking "Forgot password" link...');
        
//         await loginPage.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
//         await loginPage.clickForgotPasswordLink();

//         console.log('Step 2: Verifying forgot password page...');
//         await expect(page).toHaveURL(/.*company\/forgot-password/, { timeout: 10000 });
        
//         const resetHeading = page.getByRole('heading', { name: 'Reset company password' });
//         await expect(resetHeading).toBeVisible({ timeout: 10000 });
        
//         const description = page.getByText('We’ll email a one-time code');
//         await expect(description).toBeVisible();
        
//         const backLink = page.getByRole('link', { name: 'Back to company login' });
//         await expect(backLink).toBeVisible();
        
//         console.log('\n TEST PASSED: Navigated to forgot password page.');
//     });
// });






/////////////////////////////////////////////////////////////////////////////////////////////////////




// tests/b2b/auth/loginPage.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/pages/b2b/auth/loginPage.js');

// ==========================================
// CONFIGURATION FROM ENVIRONMENT
// ==========================================

const PORTAL_URL = process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai';

// ==========================================
// TEST DATA - MUST COME FROM .env
// ==========================================

console.log('\n' + '='.repeat(60));
console.log('ENVIRONMENT VARIABLES CHECK:');
console.log(`COMPANY_PORTAL_URL: ${process.env.COMPANY_PORTAL_URL || 'NOT SET'}`);
console.log(`COMPANY_ADMIN_EMAIL: ${process.env.COMPANY_ADMIN_EMAIL || 'NOT SET'}`);
console.log(`COMPANY_ADMIN_PASSWORD: ${process.env.COMPANY_ADMIN_PASSWORD ? '***' : 'NOT SET'}`);
console.log('='.repeat(60) + '\n');

const validCredentials = {
    email: process.env.COMPANY_ADMIN_EMAIL,
    password: process.env.COMPANY_ADMIN_PASSWORD
};

// Check if credentials exist
if (!validCredentials.email || !validCredentials.password) {
    console.error('ERROR: Credentials not found in .env file!');
    console.error('Please make sure your .env file contains:');
    console.error('COMPANY_ADMIN_EMAIL=your_email@example.com');
    console.error('COMPANY_ADMIN_PASSWORD=your_password');
    process.exit(1);
}

console.log('Valid credentials loaded from .env');
console.log(`Email: ${validCredentials.email}`);
console.log(`Password: ${validCredentials.password ? '***' : 'NOT SET'}\n`);

const invalidCredentials = {
    email: 'invalid@mockwin.ai',
    password: 'wrongpassword'
};

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Company Login Tests', () => {
    
    let loginPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        
        loginPage = new LoginPage(page);
        
        console.log(`\nNavigating to login page: ${PORTAL_URL}/company/login`);
        
        await loginPage.goTo(PORTAL_URL);
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        await loginPage.checkPageLoaded();
        
        console.log('Login page loaded successfully');
        console.log('='.repeat(60));
        console.log(`TEST STARTED: ${test.info().title}`);
        console.log('='.repeat(60));
    });

    test('TC-1: Company admin can login successfully', async ({ page }) => {
        console.log('\nTEST: Successful Login');
        console.log('-'.repeat(40));
        
        //await loginPage.takeScreenshot('before-login');
        
        console.log('Step 1: Logging in with valid credentials...');
        await loginPage.login(
            validCredentials.email,
            validCredentials.password
        );

        console.log('Step 2: Verifying successful login...');
        await loginPage.verifySuccessfulLogin();
        
        //await loginPage.takeScreenshot('after-login');
        
        console.log('\nTEST PASSED: Login successful.');
    });

    test('TC-2: Login page loads correctly', async ({ page }) => {
        console.log('\nTEST: Login Page Load');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Verifying login page elements...');
        await loginPage.checkPageLoaded();
        
        console.log('\nTEST PASSED: Login page loaded correctly.');
    });

    test('TC-3: Click "Create account" link navigates to registration', async ({ page }) => {
        console.log('\nTEST: Navigate to Registration');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Clicking "Create account" link...');
        await loginPage.clickCreateAccountLink();

        console.log('Step 2: Verifying registration page...');
        await expect(page).toHaveURL(/.*company\/register/, { timeout: 10000 });
        
        const registerHeading = page.getByRole('heading', { name: 'Create your company account' });
        await expect(registerHeading).toBeVisible({ timeout: 10000 });
        
        console.log('\nTEST PASSED: Navigated to registration page.');
    });

    test('TC-4: Invalid login shows error message', async ({ page }) => {
        console.log('\nTEST: Invalid Login');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Logging in with invalid credentials...');
        await loginPage.login(
            invalidCredentials.email,
            invalidCredentials.password
        );

        console.log('Step 2: Verifying error message...');
        await loginPage.verifyLoginFailure('Invalid credentials');
        
        console.log('\nTEST PASSED: Invalid login handled correctly.');
    });

    test('TC-5: Empty email shows validation error', async ({ page }) => {
        console.log('\nTEST: Empty Email Validation');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Clearing email field...');
        await loginPage.clearForm();
        
        console.log('Step 2: Attempting to submit with empty email...');
        await loginPage.passwordInput.fill('somepassword');
        await loginPage.signInButton.click();
        
        await page.waitForTimeout(1000);
        
        console.log('Step 3: Verifying still on login page...');
        await expect(page).toHaveURL(/.*login/);
        
        console.log('\nTEST PASSED: Empty email validation works.');
    });

    test('TC-6: Empty password shows validation error', async ({ page }) => {
        console.log('\nTEST: Empty Password Validation');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Clearing password field...');
        await loginPage.clearForm();
        
        await loginPage.emailInput.fill('test@mockwin.ai');
        
        console.log('Step 2: Attempting to submit with empty password...');
        await loginPage.signInButton.click();
        
        await page.waitForTimeout(1000);
        
        console.log('Step 3: Verifying still on login page...');
        await expect(page).toHaveURL(/.*login/);
        
        console.log('\nTEST PASSED: Empty password validation works.');
    });

    test('TC-7: Password visibility toggle works', async ({ page }) => {
        console.log('\nTEST: Password Visibility Toggle');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Typing password...');
        await loginPage.passwordInput.fill('TestPassword123');
        
        let fieldType = await loginPage.passwordInput.getAttribute('type');
        console.log(`Initial password type: ${fieldType}`);
        
        console.log('Step 2: Toggling password visibility...');
        
        const showButton = page.locator('button[aria-label="Show password"]');
        const hideButton = page.locator('button[aria-label="Hide password"]');
        
        if (await showButton.isVisible()) {
            await showButton.click();
            console.log('Clicked Show password button');
        } else if (await hideButton.isVisible()) {
            await hideButton.click();
            console.log('Clicked Hide password button');
        } else {
            console.log('Warning: No password toggle button found');
        }
        
        const newType = await loginPage.passwordInput.getAttribute('type');
        console.log(`New password type: ${newType}`);
        
        expect(newType).not.toBe(fieldType);
        
        console.log('\nTEST PASSED: Password visibility toggle works.');
    });

    test('TC-8: Click "Forgot password" link navigates to reset page', async ({ page }) => {
        console.log('\nTEST: Forgot Password Navigation');
        console.log('-'.repeat(40));
        
        console.log('Step 1: Clicking "Forgot password" link...');
        
        await loginPage.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
        await loginPage.clickForgotPasswordLink();

        console.log('Step 2: Verifying forgot password page...');
        await expect(page).toHaveURL(/.*company\/forgot-password/, { timeout: 10000 });
        
        const resetHeading = page.getByRole('heading', { name: 'Reset company password' });
        await expect(resetHeading).toBeVisible({ timeout: 10000 });
        
        const description = page.getByText('We’ll email a one-time code');
        await expect(description).toBeVisible();
        
        const backLink = page.getByRole('link', { name: 'Back to company login' });
        await expect(backLink).toBeVisible();
        
        console.log('\nTEST PASSED: Navigated to forgot password page.');
    });
});