// // import { expect } from "@playwright/test";
// // import { error } from "node:console";

// // export class registerPage {
// //     constructor(page){
// //         this.page = page;


// //         //Selectors
// //         this.pageHeading = page.getByRole('heading', { name: '/Create your company account/i' });
// //         this.pageSubHeading = page.getByText('New company workspace');

        
// //         this.pageDescription = page.getByText('Set up a modern hiring');
// //         this.alreadyUsingText = page.getByText('/Already using Mockwin?Sign in/i');


// //         //Form Fields
// //         this.companyNameInput = page.getByTestId('company-register-name-input');
// //         this.companyContactPersonInput = page.getByTestId('company-register-contact-person-input');
// //         this.companyEmailRegisterInput = page.getByTestId('company-register-email-input');

// //         this.companyMobileNumberInput = page.getByTestId('company-register-mobile-input');
// //         this.companyPasswordInput = page.getByTestId('company-register-password-input');
// //         this.companyPromoCodeInput = page.getByTestId('company-register-promo-code-input');
// //         this.companyTermsAndConditionsCheckBox = page.getByTestId('company-register-terms-checkbox');
// //         this.companySubmitButton = page.getByTestId('company-register-submit-button');

// //         //Links
// //         this.companyLoginLink = page.getByTestId('company-register-login-link');
// //         this.companyTermsLink = page.getByTestId('company-register-terms-link');

// //         //Success Indicator after Login
// //         this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });

// //     }

// //     //Company Registration Navigation Method
// //     async navigateTo(baseUrl){
// //         await this.page.goto('${baseURL}/company/register');
// //         await this.page.waitForLoadState('networkidle');
// //     }


// //     //Action Methods

// //     async register(companyData , option ={}){

// //         if(!companyData.companyNameInput) {
// //             throw new Error('Company name is required for registration / Please fill out this field');
// //         }
// //         if(!companyData.companyContactPersonInput){
// //             throw new Error('Company Person is required / Please fill out this field');
// //         }
// //         if(!companyData.companyEmailRegisterInput) {
// //             throw new Error('Company Email is Required / Please fill out this field');
// //         }
// //         if(!companyData.companyMobileNumberInput) {
// //             throw new Error('Company Mobile Number / Please fill out this field');
// //         }
// //         if(!companyData.companyPasswordInput) {
// //             throw new Error('Company Password is Required / Please fill out this field');
// //         }

// //         console.log('Registering Company: ${companyData.companyName}');
// // ///////////////////////////////////-----------------------       console.log('Admin email:${companyData.email}');          --------------------------//////////////////////////

// //         //Company Information
// //         await this.fillCompanyInformation(companyData);

// //         // Admin Account Information
// // ///////////////////////////////////----------------------        await this.fillAdminInformation(companyData);              ---------------------////////////////////////////

// //         //Terms and Conditions

// //         if(companyData.acceptTerms !== false){
// //             await this.acceptTerms();
// //         }

// //         //Submit Registration
// //         await this.submitRegistration(option);
// //     }

// //     //fill company information
// //     async fillCompanyInformation(companyData){
// //         // Company Name
// //         if(companyData.companyNameInput){
// //             await this.companyNameInput.fill(companyData.companyNameInput);
// //         }
// //         if(companyData.companyContactPersonInput){
// //             await this.companyContactPersonInput.fill(companyData.companyContactPersonInput);
// //         }
// //         if(companyData.companyEmailRegisterInput){
// //             await this.companyEmailRegisterInput.fill(companyData.companyEmailRegisterInput);
// //         }
// //         if(companyData.companyMobileNumberInput){
// //             await this.companyMobileNumberInput.fill(companyData.companyMobileNumberInput);
// //         }
// //         if(companyData.companyPasswordInput){
// //             await this.companyPasswordInput.fill(companyData.companyPasswordInput);
// //         }
// //     }
// // }






// // src/pages/b2b/auth/registerPage.js

// // const { expect } = require('@playwright/test');

// // class RegisterPage {
// //     constructor(page) {
// //         this.page = page;

// //         // Headings and text elements
// //         this.pageHeading = page.getByRole('heading', { name: 'Create your company account' });
// //         this.pageDescription = page.getByText('Set up a modern hiring workspace');
// //         this.newCompanyBadge = page.getByText('New company workspace');

// //         // Form fields
// //         this.companyNameInput = page.getByTestId('company-register-name-input');
// //         this.contactPersonInput = page.getByTestId('company-register-contact-person-input');
// //         this.emailInput = page.getByTestId('company-register-email-input');
// //         this.mobileInput = page.getByTestId('company-register-mobile-input');
// //         this.passwordInput = page.getByTestId('company-register-password-input');
// //         this.promoCodeInput = page.getByTestId('company-register-promo-code-input');

// //         // Terms and conditions
// //         this.termsCheckbox = page.getByTestId('company-register-terms-checkbox');
// //         this.termsLink = page.getByTestId('company-register-terms-link');

// //         // Buttons and links
// //         this.createAccountButton = page.getByTestId('company-register-submit-button');
// //         this.signInLink = page.getByTestId('company-register-login-link');
// //         this.showPasswordButton = page.locator('button[aria-label="Show password"]');
// //     }

// //     // Navigation Methods
// //     async goTo(baseUrl) {
// //         const registrationUrl = `${baseUrl}/company/register`;
// //         console.log(`Navigating to: ${registrationUrl}`);
// //         await this.page.goto(registrationUrl);
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     async checkPageLoaded() {
// //         await expect(this.pageHeading).toBeVisible();
// //         await expect(this.pageDescription).toBeVisible();
// //         await expect(this.companyNameInput).toBeVisible();
// //         await expect(this.emailInput).toBeVisible();
// //         await expect(this.createAccountButton).toBeVisible();
// //         await expect(this.signInLink).toBeVisible();
// //         console.log('Registration page loaded successfully');
// //     }

// //     // Form Actions
// //     async fillForm(data) {
// //         console.log('Filling registration form...');
        
// //         if (data.companyName) {
// //             await this.companyNameInput.fill(data.companyName);
// //         }
// //         if (data.contactPerson) {
// //             await this.contactPersonInput.fill(data.contactPerson);
// //         }
// //         if (data.email) {
// //             await this.emailInput.fill(data.email);
// //         }
// //         if (data.mobile) {
// //             await this.mobileInput.fill(data.mobile);
// //         }
// //         if (data.password) {
// //             await this.passwordInput.fill(data.password);
// //         }
// //         if (data.promoCode) {
// //             await this.promoCodeInput.fill(data.promoCode);
// //         }
        
// //         if (data.acceptTerms === true) {
// //             await this.termsCheckbox.check();
// //         } else if (data.acceptTerms === false) {
// //             await this.termsCheckbox.uncheck();
// //         }
        
// //         console.log('Registration form filled successfully');
// //     }

// //     async clickCreateAccountButton() {
// //         console.log('Clicking "Create company account" button...');
// //         await this.createAccountButton.waitFor({ state: 'visible', timeout: 10000 });
// //         await this.createAccountButton.click();
// //         console.log('Button clicked, waiting for OTP page...');
// //     }

// //     async register(data) {
// //         await this.fillForm(data);
// //         await this.clickCreateAccountButton();
// //     }

// //     async clearForm() {
// //         try {
// //             await this.companyNameInput.clear();
// //             await this.contactPersonInput.clear();
// //             await this.emailInput.clear();
// //             await this.mobileInput.clear();
// //             await this.passwordInput.clear();
// //             await this.promoCodeInput.clear();
            
// //             if (await this.termsCheckbox.isChecked()) {
// //                 await this.termsCheckbox.uncheck();
// //             }
// //         } catch (error) {
// //             console.log('Error clearing form:', error.message);
// //         }
// //     }

// //     async clickSignInLink() {
// //         try {
// //             await this.signInLink.click();
// //             console.log('Clicked "Sign in" link');
// //         } catch (error) {
// //             console.log('Error clicking sign in link:', error.message);
// //             throw error;
// //         }
// //     }
// // }

// // module.exports = { RegisterPage };








// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// src/pages/auth/registerPage.js

const { expect } = require('@playwright/test');
const { OTPPage } = require('./otpPage.js');
class RegisterPage {
    constructor(page) {
        this.page = page;
        this.otpPage = new OTPPage(page);

        // ==========================================
        // STATE 1: REGISTRATION FORM
        // ==========================================
        
        // Headings
        this.pageHeading = page.getByRole('heading', { name: 'Create your company account' });
        this.pageDescription = page.getByText('Set up a modern hiring workspace');
        this.newCompanyBadge = page.getByText('New company workspace');

        // Form fields
        this.companyNameInput = page.getByTestId('company-register-name-input');
        this.contactPersonInput = page.getByTestId('company-register-contact-person-input');
        this.emailInput = page.getByTestId('company-register-email-input');
        this.mobileInput = page.getByTestId('company-register-mobile-input');
        this.passwordInput = page.getByTestId('company-register-password-input');
        this.promoCodeInput = page.getByTestId('company-register-promo-code-input');

        // Terms and conditions
        this.termsCheckbox = page.getByTestId('company-register-terms-checkbox');
        this.termsLink = page.getByTestId('company-register-terms-link');

        // Buttons and links
        this.createAccountButton = page.getByTestId('company-register-submit-button');
        this.signInLink = page.getByTestId('company-register-login-link');
        this.showPasswordButton = page.locator('button[aria-label="Show password"]');

        // Error messages
        this.errorMessage = page.locator('[data-testid="error-message"]');
        this.successMessage = page.locator('[data-testid="success-message"]');

        // Field errors
        this.fieldErrors = {
            companyName: page.locator('[data-testid="company-name-error"]'),
            email: page.locator('[data-testid="email-error"]'),
            password: page.locator('[data-testid="password-error"]'),
            mobile: page.locator('[data-testid="mobile-error"]')
        };
    }

    // ==========================================
    // NAVIGATION METHODS
    // ==========================================

    async goTo(baseUrl) {
        const url = `${baseUrl}/company/register`;
        console.log(`Navigating to: ${url}`);
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async checkPageLoaded() {
        await expect(this.pageHeading).toBeVisible();
        await expect(this.pageDescription).toBeVisible();
        await expect(this.companyNameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.createAccountButton).toBeVisible();
        await expect(this.signInLink).toBeVisible();
        console.log('Registration page loaded successfully');
    }

    // ==========================================
    // FORM ACTIONS
    // ==========================================

    async fillForm(data) {
        console.log('Filling registration form...');
        
        if (data.companyName) {
            await this.companyNameInput.fill(data.companyName);
        }
        if (data.contactPerson) {
            await this.contactPersonInput.fill(data.contactPerson);
        }
        if (data.email) {
            await this.emailInput.fill(data.email);
        }
        if (data.mobile) {
            await this.mobileInput.fill(data.mobile);
        }
        if (data.password) {
            await this.passwordInput.fill(data.password);
        }
        if (data.promoCode) {
            await this.promoCodeInput.fill(data.promoCode);
        }
        
        if (data.acceptTerms === true) {
            await this.termsCheckbox.check();
        } else if (data.acceptTerms === false) {
            await this.termsCheckbox.uncheck();
        }
        
        console.log('Registration form filled successfully');
    }

    async clickCreateAccountButton() {
        console.log('Clicking "Create company account" button...');
        await this.createAccountButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.createAccountButton.click();
        console.log('Button clicked, waiting for OTP page...');
    }

    async register(data) {
        await this.fillForm(data);
        await this.clickCreateAccountButton();
    }

    async clearForm() {
        await this.companyNameInput.clear();
        await this.contactPersonInput.clear();
        await this.emailInput.clear();
        await this.mobileInput.clear();
        await this.passwordInput.clear();
        await this.promoCodeInput.clear();
        if (await this.termsCheckbox.isChecked()) {
            await this.termsCheckbox.uncheck();
        }
    }

    async clickSignInLink() {
        await this.signInLink.click();
        console.log('Clicked "Sign in" link');
    }

    // ==========================================
    // VERIFICATION METHODS
    // ==========================================

    async verifyRegistrationFailed(expectedError) {
        console.log('Verifying registration failure...');
        await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
        if (expectedError) {
            await expect(this.errorMessage).toContainText(expectedError);
        }
        await expect(this.page).toHaveURL(/.*register/);
        console.log('Registration failed as expected');
    }

    async verifyFieldError(field, expectedMessage) {
        const errorElement = this.fieldErrors[field];
        if (!errorElement) {
            throw new Error(`Unknown field: ${field}`);
        }
        await expect(errorElement).toBeVisible();
        await expect(errorElement).toHaveText(expectedMessage);
        console.log(`Field error verified for ${field}: "${expectedMessage}"`);
    }

    async verifyRedirectedToLogin() {
        await expect(this.page).toHaveURL(/.*company\/login/);
        const welcomeHeading = this.page.getByRole('heading', { name: 'Welcome back' });
        await expect(welcomeHeading).toBeVisible({ timeout: 5000 });
        console.log('Redirected to login page');
    }

    async verifyTermsCheckbox() {
        const isChecked = await this.termsCheckbox.isChecked();
        console.log(`Terms checkbox checked: ${isChecked}`);
        return isChecked;
    }

    // ==========================================
    // OTP METHODS (Using OTPPage)
    // ==========================================

    async waitForOTPPage(timeout = 10000) {
        await this.otpPage.waitForOTPPage(timeout);
    }

    async verifyOTP(otp) {
        await this.otpPage.verifyOTP(otp);
    }

    async waitForManualOTP(timeout = 180000) {
        return await this.otpPage.waitForManualOTP(timeout);
    }

    async waitForManualVerify(timeout = 180000) {
        return await this.otpPage.waitForManualVerify(timeout);
    }

    async verifyOTPSuccess() {
        await this.otpPage.verifyOTPSuccess();
    }

    async verifyOTPFailed() {
        await this.otpPage.verifyOTPFailed();
    }

    async resendOTP() {
        await this.otpPage.resendCode();
    }

    // ==========================================
    // NEW: Auto OTP Verification for Test Accounts
    // ==========================================

    /**
     * Complete registration with auto OTP verification
     * Uses a fixed OTP for test accounts
     * 
     * @param {Object} data - Registration data
     * @param {string} otp - OTP to use (default: 123456)
     */
    async registerWithAutoOTP(data, otp = '123456') {
        console.log('Registering with auto OTP...');
        
        // Step 1: Fill and submit registration
        await this.register(data);
        
        // Step 2: Wait for OTP page
        console.log('Waiting for OTP page...');
        await this.waitForOTPPage();
        
        // Step 3: Enter OTP automatically
        console.log(`Entering OTP automatically: ${otp}`);
        await this.verifyOTP(otp);
        
        // Step 4: Wait for result
        console.log('Waiting for verification result...');
        await this.page.waitForTimeout(2000);
    }

    /**
     * Register with wrong OTP to test error
     * 
     * @param {Object} data - Registration data
     * @param {string} wrongOTP - Wrong OTP to use (default: 000000)
     */
    async registerWithWrongOTP(data, wrongOTP = '000000') {
        console.log('Registering with wrong OTP for error testing...');
        
        // Step 1: Fill and submit registration
        await this.register(data);
        
        // Step 2: Wait for OTP page
        console.log('Waiting for OTP page...');
        await this.waitForOTPPage();
        
        // Step 3: Enter wrong OTP
        console.log(`Entering wrong OTP: ${wrongOTP}`);
        await this.verifyOTP(wrongOTP);
        
        // Step 4: Wait for error
        console.log('Waiting for error message...');
        await this.page.waitForTimeout(2000);
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    async takeScreenshot(name = 'register-page') {
        await this.page.screenshot({
            path: `reports/screenshots/${name}-${Date.now()}.png`,
            fullPage: true
        });
        console.log(`Screenshot saved: ${name}`);
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
}

module.exports = { RegisterPage };