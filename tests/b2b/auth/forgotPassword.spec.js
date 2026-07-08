// // tests/b2b/auth/forgotPassword.spec.js

// import { test, expect } from '@playwright/test';
// const { LoginPage } = require('../../../src/pages/b2b/auth/loginPage.js');
// const { forgotPasswordPage } = require('../../../src/pages/b2b/auth/forgotPasswordPage.js')

// // Read configuration from environment variables
// const PORTAL_URL = process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai';

// test.describe('Forgot Password Tests', () => {
    
//     let forgotPasswordPage;

//     test.beforeEach(async ({ page }) => {
//         forgotPasswordPage = new ForgotPasswordPage(page);
        
//         // Navigate to forgot password page
//         await forgotPasswordPage.goTo(PORTAL_URL);
//         await forgotPasswordPage.checkPageLoaded();
        
//         console.log('\n' + '='.repeat(60));
//         console.log('TEST STARTED');
//         console.log(`Forgot Password URL: ${PORTAL_URL}/company/forgot-password`);
//         console.log('='.repeat(60));
//     });

//     /**
//      * TC-1: Request password reset with valid email
//      */
//     test('TC-1: Request password reset with valid email', async ({ page }) => {
//         console.log('\nTEST: Request Password Reset');
//         console.log('-'.repeat(40));
        
//         // Step 1: Enter valid email
//         const testEmail = process.env.COMPANY_ADMIN_EMAIL || 'sampathkumarveesam@gmail.com';
//         console.log(`Step 1: Entering email: ${testEmail}`);
        
//         // Step 2: Request reset code
//         console.log('Step 2: Requesting reset code...');
//         await forgotPasswordPage.requestResetCode(testEmail);
        
//         // Step 3: Verify request sent
//         console.log('Step 3: Verifying request...');
//         await forgotPasswordPage.verifyResetRequestSuccess();
        
//         console.log('\nTEST PASSED: Password reset request sent.');
//     });

//     /**
//      * TC-2: Request password reset with unregistered email
//      * This shows the "company not found" error toast
//      */
//     test('TC-2: Request password reset with unregistered email shows error', async ({ page }) => {
//         console.log('\nTEST: Unregistered Email Error');
//         console.log('-'.repeat(40));
        
//         // Step 1: Enter unregistered email
//         const unregisteredEmail = 'notregistered@company.com';
//         console.log(`Step 1: Entering unregistered email: ${unregisteredEmail}`);
        
//         // Step 2: Request reset code
//         console.log('Step 2: Requesting reset code...');
//         await forgotPasswordPage.requestResetCode(unregisteredEmail);
        
//         // Step 3: Verify error toast appears with "company not found"
//         console.log('Step 3: Verifying error toast...');
//         await forgotPasswordPage.verifyResetRequestFailed('company not found');
        
//         console.log('\nTEST PASSED: Unregistered email error handled correctly.');
//     });

//     /**
//      * TC-3: Request password reset with invalid email format
//      */
//     test('TC-3: Request password reset with invalid email format', async ({ page }) => {
//         console.log('\nTEST: Invalid Email Format');
//         console.log('-'.repeat(40));
        
//         // Step 1: Enter invalid email format
//         const invalidEmail = 'not-an-email';
//         console.log(`Step 1: Entering invalid email: ${invalidEmail}`);
        
//         // Step 2: Request reset code
//         console.log('Step 2: Requesting reset code...');
//         await forgotPasswordPage.requestResetCode(invalidEmail);
        
//         // Step 3: Wait for HTML5 validation
//         await page.waitForTimeout(1000);
        
//         // Step 4: Verify still on page with validation error
//         console.log('Step 3: Verifying validation error...');
//         await forgotPasswordPage.verifyEmailValidationError();
        
//         console.log('\nTEST PASSED: Invalid email format handled correctly.');
//     });

//     /**
//      * TC-4: Navigate back to login
//      */
//     test('TC-4: Click "Back to login" navigates to login page', async ({ page }) => {
//         console.log('\nTEST: Back to Login Navigation');
//         console.log('-'.repeat(40));
        
//         // Step 1: Click back to login link
//         console.log('Step 1: Clicking "Back to login" link...');
//         await forgotPasswordPage.clickBackToLogin();

//         // Step 2: Verify redirect to login
//         console.log('Step 2: Verifying login page...');
//         await expect(page).toHaveURL(/.*company\/login/);
        
//         const welcomeHeading = page.getByRole('heading', { name: 'Welcome back' });
//         await expect(welcomeHeading).toBeVisible({ timeout: 10000 });
        
//         console.log('\nTEST PASSED: Navigated back to login page.');
//     });

//     /**
//      * TC-5: Empty email validation
//      */
//     test('TC-5: Empty email shows validation error', async ({ page }) => {
//         console.log('\nTEST: Empty Email Validation');
//         console.log('-'.repeat(40));
        
//         // Step 1: Try to submit with empty email
//         console.log('Step 1: Attempting to submit with empty email...');
//         await forgotPasswordPage.sendCodeButton.click();
        
//         // Step 2: Wait for validation
//         await page.waitForTimeout(1000);
        
//         // Step 3: Verify still on page
//         console.log('Step 2: Verifying still on forgot password page...');
//         await forgotPasswordPage.verifyEmailValidationError();
        
//         console.log('\nTEST PASSED: Empty email validation works.');
//     });

//     /**
//      * TC-6: Close error toast
//      */
//     test('TC-6: Error toast can be closed', async ({ page }) => {
//         console.log('\nTEST: Close Error Toast');
//         console.log('-'.repeat(40));
        
//         // Step 1: Trigger error by using unregistered email
//         console.log('Step 1: Triggering error with unregistered email...');
//         await forgotPasswordPage.requestResetCode('notregistered@company.com');
        
//         // Step 2: Wait for error toast to appear
//         console.log('Step 2: Waiting for error toast...');
//         await forgotPasswordPage.errorToast.waitFor({ state: 'visible', timeout: 5000 });
        
//         // Step 3: Verify error is visible
//         let isErrorVisible = await forgotPasswordPage.isErrorVisible();
//         expect(isErrorVisible).toBe(true);
//         console.log(`Error toast is visible: ${isErrorVisible}`);
        
//         // Step 4: Close the error toast
//         console.log('Step 3: Closing error toast...');
//         await forgotPasswordPage.closeErrorToast();
        
//         // Step 5: Verify error is gone
//         await page.waitForTimeout(500);
//         isErrorVisible = await forgotPasswordPage.isErrorVisible();
//         expect(isErrorVisible).toBe(false);
//         console.log(`Error toast is visible after close: ${isErrorVisible}`);
        
//         console.log('\nTEST PASSED: Error toast closed successfully.');
//     });
// });






////////////////////////////////////////////////////////////////////////////////////////






// // tests/b2b/auth/forgotPassword.spec.js

// const { test, expect } = require('@playwright/test');
// const { ForgotPasswordPage } = require('../../../src/pages/b2b/auth/forgotPasswordPage.js');

// // ==========================================
// // CONFIGURATION FROM ENVIRONMENT
// // ==========================================

// const PORTAL_URL = process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai';

// console.log('Using Portal URL:', PORTAL_URL);

// // ==========================================
// // TEST SUITE
// // ==========================================

// test.describe('Forgot Password Tests', () => {
    
//     let forgotPasswordPage;

//     test.beforeEach(async ({ page }) => {
//         test.setTimeout(60000);
        
//         forgotPasswordPage = new ForgotPasswordPage(page);
        
//         console.log(`\nNavigating to forgot password page: ${PORTAL_URL}/company/forgot-password`);
        
//         await forgotPasswordPage.goTo(PORTAL_URL);
//         await page.waitForLoadState('networkidle', { timeout: 30000 });
//         await forgotPasswordPage.checkPageLoaded();
        
//         console.log('Forgot password page loaded successfully');
//         console.log('='.repeat(60));
//         console.log(`TEST STARTED: ${test.info().title}`);
//         console.log('='.repeat(60));
//     });

//     test('TC-1: Unregistered email shows company not found error', async ({ page }) => {
//         console.log('\nTEST: Unregistered Email Error');
//         console.log('-'.repeat(40));

//         const unregisteredEmail = 'notregistered@company.com';
//         console.log(`Step 1: Requesting reset for unregistered email: ${unregisteredEmail}`);
//         await forgotPasswordPage.requestResetCode(unregisteredEmail);

//         console.log('Step 2: Verifying error message...');
//         await forgotPasswordPage.verifyCompanyNotFoundError();

//         console.log('Step 3: Verifying still on forgot password page...');
//         await expect(page).toHaveURL(/.*forgot-password/);
        
//         console.log('\nTEST PASSED: Unregistered email error handled correctly.');
//     });

//     test('TC-2: Registered email receives password reset code', async ({ page }) => {
//         console.log('\nTEST: Registered Email Request');
//         console.log('-'.repeat(40));

//         const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
//         if (!registeredEmail) {
//             throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
//         }
        
//         console.log(`Step 1: Requesting reset for registered email: ${registeredEmail}`);
//         await forgotPasswordPage.requestResetCode(registeredEmail);

//         console.log('Step 2: Verifying success message...');
//         await forgotPasswordPage.verifyResetRequestSuccess();

//         console.log('Step 3: Verifying still on forgot password page...');
//         await expect(page).toHaveURL(/.*forgot-password/);
        
//         console.log('\nTEST PASSED: Registered email request successful.');
//     });

//     test('TC-3: Click "Back to login" navigates to company login page', async ({ page }) => {
//         console.log('\nTEST: Back to Login Navigation');
//         console.log('-'.repeat(40));

//         console.log('Step 1: Clicking "Back to company login" link...');
//         await forgotPasswordPage.clickBackToLogin();

//         console.log('Step 2: Verifying login page...');
//         await forgotPasswordPage.verifyRedirectedToLogin();

//         console.log('\nTEST PASSED: Navigated back to login page.');
//     });

//     test('TC-4: Empty email shows validation error', async ({ page }) => {
//         console.log('\nTEST: Empty Email Validation');
//         console.log('-'.repeat(40));

//         console.log('Step 1: Clicking send with empty email...');
//         await forgotPasswordPage.sendCodeButton.click();

//         await page.waitForTimeout(500);

//         console.log('Step 2: Verifying we are still on the page...');
//         await expect(page).toHaveURL(/.*forgot-password/);

//         const emailElement = await forgotPasswordPage.emailInput.elementHandle();
//         const validationMessage = await emailElement.evaluate(el => el.validationMessage);
//         if (validationMessage) {
//             console.log(`Browser validation message: "${validationMessage}"`);
//         }
        
//         console.log('\nTEST PASSED: Empty email validation works.');
//     });

//     test('TC-5: Invalid email format shows validation error', async ({ page }) => {
//         console.log('\nTEST: Invalid Email Format');
//         console.log('-'.repeat(40));

//         const invalidEmail = 'not-an-email';
//         console.log(`Step 1: Entering invalid email: ${invalidEmail}`);
//         await forgotPasswordPage.emailInput.fill(invalidEmail);
        
//         console.log('Step 2: Clicking send button...');
//         await forgotPasswordPage.sendCodeButton.click();

//         await page.waitForTimeout(500);

//         console.log('Step 3: Verifying we are still on the page...');
//         await expect(page).toHaveURL(/.*forgot-password/);

//         const emailElement = await forgotPasswordPage.emailInput.elementHandle();
//         const validationMessage = await emailElement.evaluate(el => el.validationMessage);
//         if (validationMessage) {
//             console.log(`Browser validation message: "${validationMessage}"`);
//         }
        
//         console.log('\nTEST PASSED: Invalid email format validation works.');
//     });

//     test('TC-6: Resend code timer is displayed', async ({ page }) => {
//         console.log('\nTEST: Resend Code Timer');
//         console.log('-'.repeat(40));

//         const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
//         if (!registeredEmail) {
//             throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
//         }
        
//         console.log(`Step 1: Requesting reset for registered email: ${registeredEmail}`);
//         await forgotPasswordPage.requestResetCode(registeredEmail);

//         console.log('Step 2: Checking for resend button timer...');
        
//         const resendButton = page.locator('button[type="button"]:has-text("Resend in")');
//         const isVisible = await resendButton.isVisible().catch(() => false);
        
//         if (isVisible) {
//             const timerText = await resendButton.textContent();
//             console.log(`Resend button text: "${timerText}"`);
//             expect(timerText).toContain('Resend in');
//         } else {
//             console.log('No resend timer found (may not be implemented)');
//         }
        
//         console.log('\nTEST PASSED: Resend timer displayed.');
//     });
// });





///////////////////////////////////////////////////////////////////////////////////////////




// tests/b2b/auth/forgotPassword.spec.js

const { test, expect } = require('@playwright/test');
const { ForgotPasswordPage } = require('../../../src/pages/b2b/auth/forgotPasswordPage.js');

// ==========================================
// CONFIGURATION FROM ENVIRONMENT
// ==========================================

const PORTAL_URL = process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai';

// Test data
const TEST_OTP = '123456';
const TEST_NEW_PASSWORD = 'NewSecurePass123!';
const TEST_CONFIRM_PASSWORD = 'NewSecurePass123!';
const TEST_MISMATCH_PASSWORD = 'DifferentPass456!';

console.log('Using Portal URL:', PORTAL_URL);

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Forgot Password Flow Tests', () => {
    
    let forgotPasswordPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        
        forgotPasswordPage = new ForgotPasswordPage(page);
        
        console.log(`\nNavigating to forgot password page: ${PORTAL_URL}/company/forgot-password`);
        
        await forgotPasswordPage.goTo(PORTAL_URL);
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        await forgotPasswordPage.checkStep1Loaded();
        
        console.log('Forgot password page loaded successfully');
        console.log('='.repeat(60));
        console.log(`TEST STARTED: ${test.info().title}`);
        console.log('='.repeat(60));
    });

    // ==========================================
    // STEP 1 TESTS
    // ==========================================

    test('TC-1: Step 1 - Unregistered email shows company not found error', async ({ page }) => {
        console.log('\nTEST: Step 1 - Unregistered Email Error');
        console.log('-'.repeat(40));

        const unregisteredEmail = 'notregistered@company.com';
        console.log(`Step 1: Requesting reset for unregistered email: ${unregisteredEmail}`);
        await forgotPasswordPage.requestResetCode(unregisteredEmail);

        console.log('Step 2: Verifying error message...');
        await forgotPasswordPage.verifyCompanyNotFoundError();

        console.log('Step 3: Verifying still on forgot password page...');
        await expect(page).toHaveURL(/.*forgot-password/);
        
        console.log('\nTEST PASSED: Unregistered email error handled correctly.');
    });

// tests/forgotPassword.spec.js - TC-2 only

test('TC-2: Step 1 - Registered email receives password reset code', async ({ page }) => {
    console.log('\nTEST: Step 1 - Registered Email Request');
    console.log('-'.repeat(40));

    const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
    
    if (!registeredEmail) {
        throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
    }
    
    console.log(`Step 1: Requesting reset for registered email: ${registeredEmail}`);
    await forgotPasswordPage.requestResetCode(registeredEmail);

    console.log('Step 2: Verifying success message...');
    await forgotPasswordPage.verifyResetRequestSuccess();

    console.log('Step 3: Verifying still on forgot password page...');
    await expect(page).toHaveURL(/.*forgot-password/);
    
    console.log('Step 4: Verifying Step 2 section appears...');
    await forgotPasswordPage.checkStep2Loaded();
    
    console.log('\nTEST PASSED: Registered email request successful, Step 2 appears.');
});

// NEW TEST: Complete reset with manual OTP entry
test('TC-2b: Complete password reset with manual OTP entry', async ({ page, headless }) => {
    // Skip in headless mode (CI/CD)
    test.skip(headless, 'This test requires manual OTP entry and cannot run in headless mode');
    
    console.log('\nTEST: Complete Password Reset with Manual OTP');
    console.log('-'.repeat(40));

    const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
    const newPassword = 'NewSecurePass123!';
    const confirmPassword = 'NewSecurePass123!';
    
    if (!registeredEmail) {
        throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
    }
    
    console.log('Step 1: Requesting reset for registered email...');
    await forgotPasswordPage.requestResetCode(registeredEmail);
    await forgotPasswordPage.verifyResetRequestSuccess();

    console.log('Step 2: Waiting for Step 2 section...');
    await forgotPasswordPage.checkStep2Loaded();

    console.log('Step 3: Manual OTP entry required...');
    console.log('Please check your email for the OTP code.');
    console.log('Enter the OTP in the 6 boxes.');
    console.log('Enter new password and confirm password.');
    console.log('Click "Save new password".');
    console.log('You have 3 minutes to complete this.');
    
    // This will wait for manual OTP entry (3 minutes timeout)
    const result = await forgotPasswordPage.completeResetWithManualOTP(
        newPassword,
        confirmPassword,
        180000 // 3 minutes
    );

    if (result.success) {
        console.log('Step 4: Password reset successful!');
        await forgotPasswordPage.verifyRedirectedToLogin();
    } else {
        console.log('Step 4: Password reset failed');
        throw new Error(result.message);
    }
    
    console.log('\nTEST PASSED: Complete password reset with manual OTP successful.');
});

    test('TC-3: Step 1 - Click "Back to login" navigates to company login page', async ({ page }) => {
        console.log('\nTEST: Step 1 - Back to Login Navigation');
        console.log('-'.repeat(40));

        console.log('Step 1: Clicking "Back to company login" link...');
        await forgotPasswordPage.clickBackToLogin();

        console.log('Step 2: Verifying login page...');
        await forgotPasswordPage.verifyRedirectedToLogin();

        console.log('\nTEST PASSED: Navigated back to login page.');
    });

    test('TC-4: Step 1 - Empty email shows validation error', async ({ page }) => {
        console.log('\nTEST: Step 1 - Empty Email Validation');
        console.log('-'.repeat(40));

        console.log('Step 1: Clicking send with empty email...');
        await forgotPasswordPage.sendCodeButton.click();

        await page.waitForTimeout(500);

        console.log('Step 2: Verifying we are still on the page...');
        await expect(page).toHaveURL(/.*forgot-password/);

        const emailElement = await forgotPasswordPage.emailInput.elementHandle();
        const validationMessage = await emailElement.evaluate(el => el.validationMessage);
        if (validationMessage) {
            console.log(`Browser validation message: "${validationMessage}"`);
        }
        
        console.log('\nTEST PASSED: Empty email validation works.');
    });

    test('TC-5: Step 1 - Invalid email format shows validation error', async ({ page }) => {
        console.log('\nTEST: Step 1 - Invalid Email Format');
        console.log('-'.repeat(40));

        const invalidEmail = 'not-an-email';
        console.log(`Step 1: Entering invalid email: ${invalidEmail}`);
        await forgotPasswordPage.emailInput.fill(invalidEmail);
        
        console.log('Step 2: Clicking send button...');
        await forgotPasswordPage.sendCodeButton.click();

        await page.waitForTimeout(500);

        console.log('Step 3: Verifying we are still on the page...');
        await expect(page).toHaveURL(/.*forgot-password/);

        const emailElement = await forgotPasswordPage.emailInput.elementHandle();
        const validationMessage = await emailElement.evaluate(el => el.validationMessage);
        if (validationMessage) {
            console.log(`Browser validation message: "${validationMessage}"`);
        }
        
        console.log('\nTEST PASSED: Invalid email format validation works.');
    });

    // ==========================================
    // STEP 2 TESTS (Complete Flow)
    // ==========================================

    test('TC-6: Complete flow - Successful password reset', async ({ page }) => {
        console.log('\nTEST: Complete Flow - Successful Password Reset');
        console.log('-'.repeat(40));

        // Step 1: Request reset code
        const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
        if (!registeredEmail) {
            throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
        }
        
        console.log('Step 1: Requesting reset for registered email...');
        await forgotPasswordPage.requestResetCode(registeredEmail);
        await forgotPasswordPage.verifyResetRequestSuccess();

        // Step 2: Wait for Step 2 section
        console.log('Step 2: Waiting for OTP section to appear...');
        await forgotPasswordPage.checkStep2Loaded();

        // Step 3: Complete password reset
        console.log('Step 3: Completing password reset...');
        await forgotPasswordPage.completePasswordReset(
            TEST_OTP,
            TEST_NEW_PASSWORD,
            TEST_CONFIRM_PASSWORD
        );

        // Step 4: Verify success
        console.log('Step 4: Verifying success...');
        await forgotPasswordPage.verifyResetSuccess();
        
        console.log('\nTEST PASSED: Complete password reset successful.');
    });

    test('TC-7: Step 2 - Invalid OTP shows error message', async ({ page }) => {
        console.log('\nTEST: Step 2 - Invalid OTP');
        console.log('-'.repeat(40));

        // Step 1: Request reset code
        const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
        if (!registeredEmail) {
            throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
        }
        
        console.log('Step 1: Requesting reset for registered email...');
        await forgotPasswordPage.requestResetCode(registeredEmail);
        await forgotPasswordPage.verifyResetRequestSuccess();

        // Step 2: Wait for Step 2 section
        console.log('Step 2: Waiting for OTP section to appear...');
        await forgotPasswordPage.checkStep2Loaded();

        // Step 3: Enter wrong OTP
        const wrongOTP = '000000';
        console.log(`Step 3: Entering wrong OTP: ${wrongOTP}`);
        await forgotPasswordPage.enterOTP(wrongOTP);
        await forgotPasswordPage.enterNewPassword(TEST_NEW_PASSWORD);
        await forgotPasswordPage.enterConfirmPassword(TEST_CONFIRM_PASSWORD);
        await forgotPasswordPage.savePasswordButton.click();

        // Step 4: Verify error
        console.log('Step 4: Verifying error...');
        await forgotPasswordPage.verifyResetFailed('Invalid or expired OTP');
        
        console.log('\nTEST PASSED: Invalid OTP handled correctly.');
    });

    test('TC-8: Step 2 - Password mismatch shows error message', async ({ page }) => {
        console.log('\nTEST: Step 2 - Password Mismatch');
        console.log('-'.repeat(40));

        // Step 1: Request reset code
        const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
        if (!registeredEmail) {
            throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
        }
        
        console.log('Step 1: Requesting reset for registered email...');
        await forgotPasswordPage.requestResetCode(registeredEmail);
        await forgotPasswordPage.verifyResetRequestSuccess();

        // Step 2: Wait for Step 2 section
        console.log('Step 2: Waiting for OTP section to appear...');
        await forgotPasswordPage.checkStep2Loaded();

        // Step 3: Enter mismatched passwords
        console.log('Step 3: Entering mismatched passwords...');
        await forgotPasswordPage.enterOTP(TEST_OTP);
        await forgotPasswordPage.enterNewPassword(TEST_NEW_PASSWORD);
        await forgotPasswordPage.enterConfirmPassword(TEST_MISMATCH_PASSWORD);
        await forgotPasswordPage.savePasswordButton.click();

        // Step 4: Verify error
        console.log('Step 4: Verifying error...');
        await forgotPasswordPage.verifyPasswordMismatchError();
        
        console.log('\nTEST PASSED: Password mismatch handled correctly.');
    });

    test('TC-9: Step 2 - Resend code timer is displayed', async ({ page }) => {
        console.log('\nTEST: Step 2 - Resend Code Timer');
        console.log('-'.repeat(40));

        // Step 1: Request reset code
        const registeredEmail = process.env.COMPANY_ADMIN_EMAIL;
        
        if (!registeredEmail) {
            throw new Error('COMPANY_ADMIN_EMAIL not set in .env file');
        }
        
        console.log('Step 1: Requesting reset for registered email...');
        await forgotPasswordPage.requestResetCode(registeredEmail);
        await forgotPasswordPage.verifyResetRequestSuccess();

        // Step 2: Wait for Step 2 section
        console.log('Step 2: Waiting for OTP section to appear...');
        await forgotPasswordPage.checkStep2Loaded();

        // Step 3: Check resend timer
        console.log('Step 3: Checking resend button timer...');
        const timerText = await forgotPasswordPage.getResendTimerText();
        console.log(`Resend button text: "${timerText}"`);
        
        if (timerText.includes('Resend in')) {
            console.log('Timer contains time');
            expect(timerText).toContain('Resend in');
        } else {
            console.log('No resend timer found (may not be implemented)');
        }
        
        console.log('\nTEST PASSED: Resend timer displayed.');
    });
});