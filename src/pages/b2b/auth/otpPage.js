// src/pages/b2b/auth/otpPage.js

import { expect } from '@playwright/test';

export class OTPPage {
    constructor(page) {
        this.page = page;

        // ==========================================
        // ELEMENTS ON OTP PAGE
        // ==========================================
        
        // Headings
        this.pageHeading = page.getByRole('heading', { name: 'Verify your work email' });
        this.pageDescription = page.getByText("We've sent a 6-digit code to");
        
        // OTP input fields (6 individual boxes)
        this.otpInputs = page.locator('input[inputmode="numeric"][maxlength="1"]');
        
        // Buttons
        this.verifyButton = page.getByTestId('company-register-submit-button');
        this.resendButton = page.getByRole('button', { name: 'Resend code' });
        
        // Messages
        this.errorMessage = page.locator('[data-testid="error-message"]');
        this.successMessage = page.locator('[data-testid="success-message"]');
    }

    // ==========================================
    // VERIFICATION METHODS
    // ==========================================

    /**
     * Verify that the OTP page loaded correctly
     */
    async checkPageLoaded() {
        try {
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
            await expect(this.verifyButton).toBeVisible({ timeout: 10000 });
            
            const inputCount = await this.otpInputs.count();
            if (inputCount === 0) {
                console.log('Warning: No OTP input fields found');
            }
            
            return true;
        } catch (error) {
            console.log('OTP page not loaded correctly:', error.message);
            throw error;
        }
    }

    /**
     * Wait for OTP page to load after registration
     */
    async waitForOTPPage(timeout = 10000) {
        try {
            await this.pageHeading.waitFor({ state: 'visible', timeout });
            console.log('OTP page loaded successfully');
        } catch (error) {
            console.log('OTP page did not load within timeout');
            throw error;
        }
    }

    // ==========================================
    // OTP ENTRY METHODS
    // ==========================================

    /**
     * Enter OTP digit by digit into the 6 boxes
     */
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

    /**
     * Enter OTP and click verify (automated)
     */
    async verifyOTP(otp) {
        await this.enterOTP(otp);
        console.log('Clicking Verify button...');
        await this.verifyButton.click();
    }

    /**
     * Clear all OTP fields
     */
    async clearOTP() {
        const inputs = await this.otpInputs.all();
        for (const input of inputs) {
            await input.clear();
        }
        console.log('OTP fields cleared');
    }

    // ==========================================
    // MANUAL OTP WAIT METHODS
    // ==========================================

    /**
     * Wait for user to manually enter OTP and click verify
     * Best for manual testing with visible browser
     */
    async waitForManualVerify(timeout = 180000) {
        console.log('='.repeat(60));
        console.log('MANUAL OTP ENTRY REQUIRED');
        console.log('='.repeat(60));
        console.log('1. Check your email for the 6-digit OTP');
        console.log('2. Enter the OTP in the 6 boxes on the page');
        console.log('3. Click the "Verify & continue" button');
        console.log(`You have ${timeout / 1000} seconds to complete this`);
        console.log('='.repeat(60));
        
        try {
            const result = await Promise.race([
                this.page.waitForURL(/.*dashboard|.*onboarding/, { timeout })
                    .then(() => ({ success: true, message: 'Verification successful' })),
                
                this.errorMessage.waitFor({ state: 'visible', timeout })
                    .then(async () => ({ 
                        success: false, 
                        message: await this.getErrorMessage() 
                    })),
                
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

    /**
     * Simplified wait for manual OTP entry
     */
    async waitForManualOTP(timeout = 180000) {
        console.log('Waiting for OTP entry...');
        console.log(`You have ${timeout / 1000} seconds to enter OTP and click verify`);
        
        try {
            const result = await Promise.race([
                this.page.waitForURL(/.*dashboard|.*onboarding/, { timeout })
                    .then(() => ({ success: true, message: 'OTP verification successful' })),
                
                this.errorMessage.waitFor({ state: 'visible', timeout })
                    .then(async () => ({ 
                        success: false, 
                        message: await this.getErrorMessage() 
                    })),
                
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('OTP entry timed out')), timeout)
                )
            ]);
            
            return result;
            
        } catch (error) {
            console.log('Error during OTP entry:', error.message);
            throw error;
        }
    }

    // ==========================================
    // VERIFICATION METHODS
    // ==========================================

    /**
     * Verify OTP was successful
     */
    async verifyOTPSuccess() {
        await expect(this.page).toHaveURL(/.*dashboard|.*onboarding/);
        console.log('OTP verification successful');
    }

    /**
     * Verify OTP failed
     */
    async verifyOTPFailed() {
        try {
            await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
            await expect(this.page).toHaveURL(/.*register/);
            console.log('OTP verification failed as expected');
        } catch (error) {
            console.log('Error verifying OTP failure:', error.message);
            throw error;
        }
    }

    /**
     * Get the error message text
     */
    async getErrorMessage() {
        try {
            if (await this.errorMessage.isVisible()) {
                return await this.errorMessage.textContent();
            }
            return 'No error message found';
        } catch (error) {
            return 'Unknown error occurred';
        }
    }

    /**
     * Check if user is on dashboard
     */
    async isOnDashboard() {
        try {
            await this.page.waitForURL(/.*dashboard/, { timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Click resend code button
     */
    async resendCode() {
        console.log('Clicking Resend code...');
        await this.resendButton.click();
    }
}