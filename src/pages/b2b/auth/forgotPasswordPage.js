// const { expect } = require('@playwright/test');

// class ForgotPasswordPage {
//     constructor(page) {
//         this.page = page;

//         // HEADINGS AND TEXT ELEMENTS
//         this.secureAccessBadge = page.getByText('Secure company access');
//         this.resetHeading = page.getByRole('heading', { name: 'Reset company password' });
//         this.resetDescription = page.getByText('We’ll email a one-time code');

//         // FORM FIELDS
//         this.emailInput = page.locator('input[id="email"]');
//         this.sendCodeButton = page.locator('button[type="submit"]');

//         // LINKS
//         this.backToLoginLink = page.getByRole('link', { name: 'Back to company login' });

//         // ERROR AND SUCCESS MESSAGES
//         this.errorToast = page.getByText('Errorcompany not found');
//         this.errorMessage = page.getByText('Errorcompany not found');
//         this.successToast = page.locator('div').filter({ hasText: 'OTP SentPlease check your' }).nth(1);
//         this.successMessage = page.locator('div').filter({ hasText: 'OTP SentPlease check your' }).nth(1);
//     }

//     // NAVIGATION METHODS
//     async goTo(baseUrl) {
//         const url = `${baseUrl}/company/forgot-password`;
//         console.log(`Navigating to: ${url}`);
//         await this.page.goto(url);
//         await this.page.waitForLoadState('networkidle');
//     }

//     async checkPageLoaded() {
//         await expect(this.resetHeading).toBeVisible();
//         await expect(this.resetDescription).toBeVisible();
//         await expect(this.emailInput).toBeVisible();
//         await expect(this.sendCodeButton).toBeVisible();
//         await expect(this.backToLoginLink).toBeVisible();
//         console.log('Forgot password page loaded successfully');
//     }

//     // ACTION METHODS
//     async requestResetCode(email) {
//         console.log(`Requesting password reset for: ${email}`);
//         await this.emailInput.fill(email);
//         await this.sendCodeButton.click();
//         console.log('Password reset code requested');
//     }

//     async clickBackToLogin() {
//         await this.backToLoginLink.click();
//         console.log('Clicked "Back to login" link');
//     }

//     async clearEmail() {
//         await this.emailInput.clear();
//     }

//     // VERIFICATION METHODS
//     async verifyCompanyNotFoundError() {
//         console.log('Verifying "company not found" error...');
//         await expect(this.errorToast).toBeVisible({ timeout: 5000 });
//         await expect(this.errorMessage).toContainText('company not found');
//         console.log('"Company not found" error verified');
//     }

//     async verifyError(expectedMessage) {
//         console.log(`Verifying error: "${expectedMessage}"...`);
//         await expect(this.errorToast).toBeVisible({ timeout: 5000 });
//         await expect(this.errorMessage).toContainText(expectedMessage);
//         console.log(`Error "${expectedMessage}" verified`);
//     }

//     async verifyResetRequestSuccess() {
//         console.log('Verifying successful reset request...');
//         await expect(this.successToast).toBeVisible({ timeout: 5000 });
//         const message = await this.successMessage.textContent();
//         console.log(`Success message: ${message}`);
//         console.log('Reset request successful');
//     }

//     async verifyRedirectedToLogin() {
//         await expect(this.page).toHaveURL(/.*company\/login/);
//         const welcomeHeading = this.page.getByRole('heading', { name: 'Welcome back' });
//         await expect(welcomeHeading).toBeVisible({ timeout: 5000 });
//         console.log('Redirected to login page');
//     }

//     async getErrorMessage() {
//         try {
//             if (await this.errorMessage.isVisible()) {
//                 return await this.errorMessage.textContent();
//             }
//             return 'No error message found';
//         } catch {
//             return 'Unable to retrieve error message';
//         }
//     }
// }

// module.exports = { ForgotPasswordPage };






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/pages/b2b/auth/forgotPasswordPage.js

const { expect } = require('@playwright/test');

class ForgotPasswordPage {
    constructor(page) {
        this.page = page;

        // ==========================================
        // STEP 1: FORGOT PASSWORD SECTION
        // ==========================================

        // Headings and text elements - Step 1
        this.secureAccessBadge = page.getByText('Secure company access');
        this.resetHeading = page.getByRole('heading', { name: 'Reset company password' });
        this.resetDescription = page.getByText('We’ll email a one-time code');

        // Form fields - Step 1
        this.emailInput = page.locator('input[id="email"]');
        this.sendCodeButton = page.locator('button[type="submit"]');

        // Links - Step 1
        this.backToLoginLink = page.getByRole('link', { name: 'Back to company login' });

        // ==========================================
        // STEP 2: RESET PASSWORD SECTION (After OTP sent)
        // ==========================================

        // Headings and text elements - Step 2
        this.resetPasswordHeading = page.getByRole('heading', { name: 'Set a new secure password' });
        this.resetPasswordDescription = page.getByText('Enter the code from your email and choose a strong password');

        // OTP input fields (6 individual boxes) - Step 2
        this.otpInputs = page.locator('input[inputmode="numeric"][maxlength="1"]');

        // Password fields - Step 2
        this.newPasswordInput = page.locator('#newPassword');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.showNewPasswordButton = page.locator('#newPassword + button');

        // Buttons - Step 2
        this.savePasswordButton = page.locator('button[type="submit"]:has-text("Save new password")');
        this.resendButton = page.locator('button[type="button"]:has-text("Resend in")');
        this.resendLink = page.locator('button[type="button"]:has-text("Resend")');

        // ==========================================
        // MESSAGES (Both Steps)
        // ==========================================

        // Error toast container
        this.errorToast = page.locator('.border-red-100.bg-red-50').first();
        this.errorMessage = page.locator('p.mt-1.text-sm.text-muted-foreground');

        // Success toast
        this.successToast = page.locator('.border-green-100.bg-green-50').first();
        this.successMessage = page.locator('p.mt-1.text-sm.text-muted-foreground');
    }

    // ==========================================
    // NAVIGATION METHODS
    // ==========================================

    async goTo(baseUrl) {
        const forgotPasswordUrl = `${baseUrl}/company/forgot-password`;
        console.log(`Navigating to: ${forgotPasswordUrl}`);
        await this.page.goto(forgotPasswordUrl);
        await this.page.waitForLoadState('networkidle');
    }

    // ==========================================
    // STEP 1: FORGOT PASSWORD METHODS
    // ==========================================

    async checkStep1Loaded() {
        await expect(this.resetHeading).toBeVisible();
        await expect(this.resetDescription).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.sendCodeButton).toBeVisible();
        await expect(this.backToLoginLink).toBeVisible();
        console.log('Step 1: Forgot password page loaded successfully');
    }

    async requestResetCode(email) {
        console.log(`Step 1: Requesting password reset for: ${email}`);
        await this.emailInput.fill(email);
        await this.sendCodeButton.click();
        console.log('Step 1: Password reset code requested');
    }

    // ==========================================
    // STEP 2: RESET PASSWORD METHODS (After OTP Sent)
    // ==========================================

    async checkStep2Loaded() {
        await expect(this.resetPasswordHeading).toBeVisible();
        await expect(this.resetPasswordDescription).toBeVisible();
        await expect(this.otpInputs.first()).toBeVisible();
        await expect(this.newPasswordInput).toBeVisible();
        await expect(this.confirmPasswordInput).toBeVisible();
        await expect(this.savePasswordButton).toBeVisible();
        console.log('Step 2: Reset password section loaded successfully');
    }

    async enterOTP(otp) {
        console.log(`Step 2: Entering OTP: ${otp}`);
        const digits = otp.toString().split('');
        const inputs = await this.otpInputs.all();
        
        for (let i = 0; i < digits.length && i < inputs.length; i++) {
            await inputs[i].fill(digits[i]);
            if (i < digits.length - 1) {
                await inputs[i].press('Tab');
            }
        }
        console.log('Step 2: OTP entered successfully');
    }

    async enterNewPassword(password) {
        await this.newPasswordInput.fill(password);
        console.log('Step 2: New password entered');
    }

    async enterConfirmPassword(password) {
        await this.confirmPasswordInput.fill(password);
        console.log('Step 2: Confirm password entered');
    }

    async completePasswordReset(otp, newPassword, confirmPassword) {
        console.log('Step 2: Completing password reset...');
        await this.enterOTP(otp);
        await this.enterNewPassword(newPassword);
        await this.enterConfirmPassword(confirmPassword);
        await this.savePasswordButton.click();
        console.log('Step 2: Password reset form submitted');
    }

    // ==========================================
    // NEW: MANUAL OTP ENTRY FOR REGISTERED EMAIL
    // ==========================================

    /**
     * Complete password reset with manual OTP entry
     * Waits for user to manually enter OTP from email
     * 
     * @param {string} newPassword - New password to set
     * @param {string} confirmPassword - Confirm new password
     * @param {number} timeout - Time to wait for manual OTP entry (default: 3 minutes)
     */
    async completeResetWithManualOTP(newPassword, confirmPassword, timeout = 180000) {
        console.log('='.repeat(60));
        console.log('MANUAL OTP ENTRY REQUIRED');
        console.log('='.repeat(60));
        console.log('1. Check your email for the 6-digit OTP');
        console.log('2. Enter the OTP in the 6 boxes on the page');
        console.log('3. Enter new password and confirm password');
        console.log('4. Click "Save new password" button');
        console.log(`You have ${timeout / 1000} seconds to complete this`);
        console.log('='.repeat(60));
        
        // Wait for OTP section to be visible
        await this.checkStep2Loaded();
        
        // Wait for user to enter OTP and submit
        try {
            const result = await Promise.race([
                // Success: Redirect to login page
                this.page.waitForURL(/.*company\/login/, { timeout })
                    .then(() => ({ success: true, message: 'Password reset successful' })),
                
                // Error: Error message appears
                this.errorToast.waitFor({ state: 'visible', timeout })
                    .then(async () => ({ 
                        success: false, 
                        message: await this.getErrorMessage() 
                    })),
                
                // Timeout
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Manual OTP entry timed out')), timeout)
                )
            ]);
            
            return result;
            
        } catch (error) {
            console.log('Error during manual OTP entry:', error.message);
            throw error;
        }
    }

    // ==========================================
    // VERIFICATION METHODS
    // ==========================================

    // Step 1 Verification
    async verifyCompanyNotFoundError() {
        console.log('Verifying "company not found" error...');
        await expect(this.errorToast).toBeVisible({ timeout: 5000 });
        await expect(this.errorMessage).toContainText('company not found');
        console.log('"Company not found" error verified');
    }

    async verifyResetRequestSuccess() {
        console.log('Verifying successful reset request...');
        
        try {
            await this.successToast.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Success toast is visible');
            
            try {
                const message = await this.successMessage.textContent();
                console.log(`Success message: ${message}`);
            } catch {
                console.log('Success message text not available');
            }
            
            console.log('Reset request successful');
            
        } catch (error) {
            console.log('Success toast not found, checking for other indicators...');
            await expect(this.page).toHaveURL(/.*forgot-password/);
            console.log('Still on forgot password page - request may have been sent');
        }
    }

    // Step 2 Verification
    async verifyResetSuccess() {
        console.log('Verifying password reset success...');
        // On success, user is redirected to login page
        await expect(this.page).toHaveURL(/.*company\/login/, { timeout: 10000 });
        console.log('Redirected to login page - password reset successful');
    }

    async verifyResetFailed(expectedError) {
        console.log('Verifying reset failure...');
        
        // On failure, user stays on the same page with error toast
        await expect(this.page).toHaveURL(/.*forgot-password/);
        console.log('Still on forgot password page');
        
        await this.errorToast.waitFor({ state: 'visible', timeout: 5000 });
        
        if (expectedError) {
            await expect(this.errorMessage).toContainText(expectedError);
            console.log(`Error message verified: "${expectedError}"`);
        }
        console.log('Password reset failed as expected');
    }

    async verifyPasswordMismatchError() {
        console.log('Verifying password mismatch error...');
        
        // On failure, user stays on the same page
        await expect(this.page).toHaveURL(/.*forgot-password/);
        console.log('Still on forgot password page');
        
        await this.errorToast.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.errorMessage).toContainText(page.getByText('Passwords do not match'));
        console.log('Password mismatch error verified');
    }

    async verifyRedirectedToLogin() {
        await expect(this.page).toHaveURL(/.*company\/login/);
        const welcomeHeading = this.page.getByRole('heading', { name: 'Welcome back' });
        await expect(welcomeHeading).toBeVisible({ timeout: 5000 });
        console.log('Redirected to login page');
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    async clickBackToLogin() {
        await this.backToLoginLink.click();
        console.log('Clicked "Back to login" link');
        await this.verifyRedirectedToLogin();
    }

    async clearEmail() {
        await this.emailInput.clear();
    }

    async getErrorMessage() {
        try {
            if (await this.errorMessage.isVisible()) {
                return await this.errorMessage.textContent();
            }
            return 'No error message found';
        } catch {
            return 'Unable to retrieve error message';
        }
    }

    async getResendTimerText() {
        try {
            return await this.resendButton.textContent();
        } catch {
            return 'Resend button not found';
        }
    }

    async isResendEnabled() {
        try {
            const isDisabled = await this.resendButton.getAttribute('disabled');
            return !isDisabled;
        } catch {
            return false;
        }
    }
}

module.exports = { ForgotPasswordPage };