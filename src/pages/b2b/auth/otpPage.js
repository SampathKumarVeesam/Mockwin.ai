// // src/pages/auth/otpPage.js

// const { expect } = require('@playwright/test');

// class OTPPage {
//     constructor(page) {
//         this.page = page;

//         // ==========================================
//         // OTP ELEMENTS
//         // ==========================================
        
//         // Headings
//         this.otpHeading = page.getByRole('heading', { name: 'Verify your work email' });
//         this.otpDescription = page.getByText("We've sent a 6-digit code to");

//         // OTP input fields (6 individual boxes)
//         this.otpInputs = page.locator('input[inputmode="numeric"][maxlength="1"]');

//         // Buttons
//         this.verifyButton = page.getByTestId('company-register-submit-button');
//         this.resendButton = page.getByRole('button', { name: 'Resend code' });

//         // Messages
//         this.errorMessage = page.getByText('Invalid OTP');
//         this.successMessage = page.locator('[data-testid="success-message"]');
//     }

//     // ==========================================
//     // NAVIGATION / VERIFICATION METHODS
//     // ==========================================

//     async waitForOTPPage(timeout = 10000) {
//         await this.otpHeading.waitFor({ state: 'visible', timeout });
//         console.log('OTP page loaded successfully');
//     }

//     async checkPageLoaded() {
//         await expect(this.otpHeading).toBeVisible({ timeout: 10000 });
//         await expect(this.verifyButton).toBeVisible({ timeout: 10000 });
//         console.log('OTP page verified');
//     }

//     // ==========================================
//     // OTP ENTRY METHODS
//     // ==========================================

//     async enterOTP(otp) {
//         console.log(`Entering OTP: ${otp}`);
//         const digits = otp.toString().split('');
//         const inputs = await this.otpInputs.all();
        
//         for (let i = 0; i < digits.length && i < inputs.length; i++) {
//             await inputs[i].fill(digits[i]);
//             if (i < digits.length - 1) {
//                 await inputs[i].press('Tab');
//             }
//         }
//         console.log('OTP entered successfully');
//     }

//     async verifyOTP(otp) {
//         await this.enterOTP(otp);
//         console.log('Clicking Verify button...');
//         await this.verifyButton.click();
//     }

//     async clearOTP() {
//         const inputs = await this.otpInputs.all();
//         for (const input of inputs) {
//             await input.clear();
//         }
//         console.log('OTP fields cleared');
//     }

//     // ==========================================
//     // MANUAL OTP ENTRY (For headed testing)
//     // ==========================================

//     async waitForManualOTP(timeout = 180000) {
//         console.log('='.repeat(60));
//         console.log('MANUAL OTP ENTRY REQUIRED');
//         console.log('='.repeat(60));
//         console.log('1. Check your email for the 6-digit OTP');
//         console.log('2. Enter the OTP in the 6 boxes on the page');
//         console.log('3. Complete the remaining fields');
//         console.log('4. Click the submit button');
//         console.log(`You have ${timeout / 1000} seconds to complete this`);
//         console.log('='.repeat(60));
        
//         try {
//             const result = await Promise.race([
//                 // Success: Redirect to login or dashboard
//                 this.page.waitForURL(/.*login|.*dashboard/, { timeout })
//                     .then(() => ({ success: true, message: 'Verification successful' })),
                
//                 // Error: Error message appears
//                 this.errorMessage.waitFor({ state: 'visible', timeout })
//                     .then(async () => ({ 
//                         success: false, 
//                         message: await this.getErrorMessage() 
//                     })),
                
//                 // Timeout
//                 new Promise((_, reject) => 
//                     setTimeout(() => reject(new Error('Manual OTP entry timed out')), timeout)
//                 )
//             ]);
            
//             return result;
//         } catch (error) {
//             console.log('Error during manual OTP entry:', error.message);
//             throw error;
//         }
//     }

//     // ==========================================
//     // VERIFICATION METHODS
//     // ==========================================

//     async verifyOTPSuccess() {
//         await expect(this.page).toHaveURL(/.*dashboard|.*onboarding/);
//         console.log('OTP verification successful');
//     }

//     async verifyOTPFailed() {
//         await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
//         await expect(this.page).toHaveURL(/.*register/);
//         console.log('OTP verification failed as expected');
//     }

//     async getErrorMessage() {
//         try {
//             if (await this.errorMessage.isVisible()) {
//                 return await this.errorMessage.textContent();
//             }
//             return 'No error message found';
//         } catch {
//             return 'Unknown error occurred';
//         }
//     }

//     async resendCode() {
//         console.log('Clicking Resend code...');
//         await this.resendButton.click();
//     }
// }

// module.exports = { OTPPage };















// src/pages/auth/otpPage.js

const { expect } = require('@playwright/test');

class OTPPage {
    constructor(page) {
        this.page = page;

        // ==========================================
        // OTP ELEMENTS
        // ==========================================
        
        // Headings
        this.otpHeading = page.getByRole('heading', { name: 'Verify your work email' });
        this.otpDescription = page.getByText("We've sent a 6-digit code to");

        // OTP input fields (6 individual boxes)
        this.otpInputs = page.locator('input[inputmode="numeric"][maxlength="1"]');

        // Buttons
        this.verifyButton = page.getByTestId('company-register-submit-button');
        this.resendButton = page.getByRole('button', { name: 'Resend code' });

        // Messages
        this.errorMessage = page.getByText('Invalid OTP');
        this.successMessage = page.locator('[data-testid="success-message"]');
    }

    // ==========================================
    // NAVIGATION / VERIFICATION METHODS
    // ==========================================

    async waitForOTPPage(timeout = 10000) {
        await this.otpHeading.waitFor({ state: 'visible', timeout });
        console.log('OTP page loaded successfully');
    }

    async checkPageLoaded() {
        await expect(this.otpHeading).toBeVisible({ timeout: 10000 });
        await expect(this.verifyButton).toBeVisible({ timeout: 10000 });
        console.log('OTP page verified');
    }

    // ==========================================
    // OTP ENTRY METHODS
    // ==========================================

    async enterOTP(otp) {
        console.log(`Entering OTP: ${otp}`);
        const digits = otp.toString().split('');
        const inputs = await this.otpInputs.all();
        
        for (let i = 0; i < digits.length && i < inputs.length; i++) {
            await inputs[i].fill(digits[i]);
            if (i < digits.length - 1) {
                await inputs[i].press('Tab');
            }
        }
        console.log('OTP entered successfully');
    }

    async verifyOTP(otp) {
        await this.enterOTP(otp);
        console.log('Clicking Verify button...');
        await this.verifyButton.click();
    }

    async clearOTP() {
        const inputs = await this.otpInputs.all();
        for (const input of inputs) {
            await input.clear();
        }
        console.log('OTP fields cleared');
    }

    // ==========================================
    // MANUAL OTP ENTRY (For headed testing)
    // ==========================================

    async waitForManualOTP(timeout = 180000) {
        console.log('='.repeat(60));
        console.log('MANUAL OTP ENTRY REQUIRED');
        console.log('='.repeat(60));
        console.log('1. Check your email for the 6-digit OTP');
        console.log('2. Enter the OTP in the 6 boxes on the page');
        console.log('3. Complete the remaining fields');
        console.log('4. Click the submit button');
        console.log(`You have ${timeout / 1000} seconds to complete this`);
        console.log('='.repeat(60));
        
        try {
            const result = await Promise.race([
                // Success: Redirect to login or dashboard
                this.page.waitForURL(/.*login|.*dashboard/, { timeout })
                    .then(() => ({ success: true, message: 'Verification successful' })),
                
                // Error: Error message appears
                this.errorMessage.waitFor({ state: 'visible', timeout })
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
    // FIXED: waitForManualVerify - Alias for waitForManualOTP
    // ==========================================

    async waitForManualVerify(timeout = 180000) {
        console.log('='.repeat(60));
        console.log('MANUAL OTP VERIFICATION REQUIRED');
        console.log('='.repeat(60));
        console.log('1. Check your email for the 6-digit OTP');
        console.log('2. Enter the OTP in the 6 boxes on the page');
        console.log('3. Click the "Verify & continue" button');
        console.log(`You have ${timeout / 1000} seconds to complete this`);
        console.log('='.repeat(60));
        
        try {
            const result = await Promise.race([
                // Success: Redirect to login or dashboard
                this.page.waitForURL(/.*login|.*dashboard/, { timeout })
                    .then(() => ({ success: true, message: 'Verification successful' })),
                
                // Error: Error message appears
                this.errorMessage.waitFor({ state: 'visible', timeout })
                    .then(async () => ({ 
                        success: false, 
                        message: await this.getErrorMessage() 
                    })),
                
                // Timeout
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Manual OTP verification timed out')), timeout)
                )
            ]);
            
            return result;
        } catch (error) {
            console.log('Error during manual OTP verification:', error.message);
            throw error;
        }
    }

    // ==========================================
    // VERIFICATION METHODS
    // ==========================================

    async verifyOTPSuccess() {
        await expect(this.page).toHaveURL(/.*dashboard|.*onboarding/);
        console.log('OTP verification successful');
    }

    async verifyOTPFailed() {
        await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
        await expect(this.page).toHaveURL(/.*register/);
        console.log('OTP verification failed as expected');
    }

    async getErrorMessage() {
        try {
            if (await this.errorMessage.isVisible()) {
                return await this.errorMessage.textContent();
            }
            return 'No error message found';
        } catch {
            return 'Unknown error occurred';
        }
    }

    async resendCode() {
        console.log('Clicking Resend code...');
        await this.resendButton.click();
    }
}

module.exports = { OTPPage };