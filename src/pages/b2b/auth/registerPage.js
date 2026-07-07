// import { expect } from "@playwright/test";
// import { error } from "node:console";

// export class registerPage {
//     constructor(page){
//         this.page = page;


//         //Selectors
//         this.pageHeading = page.getByRole('heading', { name: '/Create your company account/i' });
//         this.pageSubHeading = page.getByText('New company workspace');

        
//         this.pageDescription = page.getByText('Set up a modern hiring');
//         this.alreadyUsingText = page.getByText('/Already using Mockwin?Sign in/i');


//         //Form Fields
//         this.companyNameInput = page.getByTestId('company-register-name-input');
//         this.companyContactPersonInput = page.getByTestId('company-register-contact-person-input');
//         this.companyEmailRegisterInput = page.getByTestId('company-register-email-input');

//         this.companyMobileNumberInput = page.getByTestId('company-register-mobile-input');
//         this.companyPasswordInput = page.getByTestId('company-register-password-input');
//         this.companyPromoCodeInput = page.getByTestId('company-register-promo-code-input');
//         this.companyTermsAndConditionsCheckBox = page.getByTestId('company-register-terms-checkbox');
//         this.companySubmitButton = page.getByTestId('company-register-submit-button');

//         //Links
//         this.companyLoginLink = page.getByTestId('company-register-login-link');
//         this.companyTermsLink = page.getByTestId('company-register-terms-link');

//         //Success Indicator after Login
//         this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });

//     }

//     //Company Registration Navigation Method
//     async navigateTo(baseUrl){
//         await this.page.goto('${baseURL}/company/register');
//         await this.page.waitForLoadState('networkidle');
//     }


//     //Action Methods

//     async register(companyData , option ={}){

//         if(!companyData.companyNameInput) {
//             throw new Error('Company name is required for registration / Please fill out this field');
//         }
//         if(!companyData.companyContactPersonInput){
//             throw new Error('Company Person is required / Please fill out this field');
//         }
//         if(!companyData.companyEmailRegisterInput) {
//             throw new Error('Company Email is Required / Please fill out this field');
//         }
//         if(!companyData.companyMobileNumberInput) {
//             throw new Error('Company Mobile Number / Please fill out this field');
//         }
//         if(!companyData.companyPasswordInput) {
//             throw new Error('Company Password is Required / Please fill out this field');
//         }

//         console.log('Registering Company: ${companyData.companyName}');
// ///////////////////////////////////-----------------------       console.log('Admin email:${companyData.email}');          --------------------------//////////////////////////

//         //Company Information
//         await this.fillCompanyInformation(companyData);

//         // Admin Account Information
// ///////////////////////////////////----------------------        await this.fillAdminInformation(companyData);              ---------------------////////////////////////////

//         //Terms and Conditions

//         if(companyData.acceptTerms !== false){
//             await this.acceptTerms();
//         }

//         //Submit Registration
//         await this.submitRegistration(option);
//     }

//     //fill company information
//     async fillCompanyInformation(companyData){
//         // Company Name
//         if(companyData.companyNameInput){
//             await this.companyNameInput.fill(companyData.companyNameInput);
//         }
//         if(companyData.companyContactPersonInput){
//             await this.companyContactPersonInput.fill(companyData.companyContactPersonInput);
//         }
//         if(companyData.companyEmailRegisterInput){
//             await this.companyEmailRegisterInput.fill(companyData.companyEmailRegisterInput);
//         }
//         if(companyData.companyMobileNumberInput){
//             await this.companyMobileNumberInput.fill(companyData.companyMobileNumberInput);
//         }
//         if(companyData.companyPasswordInput){
//             await this.companyPasswordInput.fill(companyData.companyPasswordInput);
//         }
//     }
// }






// src/pages/b2b/auth/registerPage.js

const { expect } = require('@playwright/test');

class RegisterPage {
    constructor(page) {
        this.page = page;

        // Headings and text elements
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
    }

    // Navigation Methods
    async goTo(baseUrl) {
        const registrationUrl = `${baseUrl}/company/register`;
        console.log(`Navigating to: ${registrationUrl}`);
        await this.page.goto(registrationUrl);
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

    // Form Actions
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
        try {
            await this.companyNameInput.clear();
            await this.contactPersonInput.clear();
            await this.emailInput.clear();
            await this.mobileInput.clear();
            await this.passwordInput.clear();
            await this.promoCodeInput.clear();
            
            if (await this.termsCheckbox.isChecked()) {
                await this.termsCheckbox.uncheck();
            }
        } catch (error) {
            console.log('Error clearing form:', error.message);
        }
    }

    async clickSignInLink() {
        try {
            await this.signInLink.click();
            console.log('Clicked "Sign in" link');
        } catch (error) {
            console.log('Error clicking sign in link:', error.message);
            throw error;
        }
    }
}

module.exports = { RegisterPage };