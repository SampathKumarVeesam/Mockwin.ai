import { expect } from "@playwright/test";
import { error } from "node:console";

export class registerPage {
    constructor(page){
        this.page = page;


        //Selectors
        this.pageHeading = page.getByRole('heading', { name: '/Create your company account/i' });
        this.pageSubHeading = page.getByText('New company workspace');

        
        this.pageDescription = page.getByText('Set up a modern hiring');
        this.alreadyUsingText = page.getByText('/Already using Mockwin?Sign in/i');


        //Form Fields
        this.companyNameInput = page.getByTestId('company-register-name-input');
        this.companyContactPersonInput = page.getByTestId('company-register-contact-person-input');
        this.companyEmailRegisterInput = page.getByTestId('company-register-email-input');

        this.companyMobileNumberInput = page.getByTestId('company-register-mobile-input');
        this.companyPasswordInput = page.getByTestId('company-register-password-input');
        this.companyPromoCodeInput = page.getByTestId('company-register-promo-code-input');
        this.companyTermsAndConditionsCheckBox = page.getByTestId('company-register-terms-checkbox');
        this.companySubmitButton = page.getByTestId('company-register-submit-button');

        //Links
        this.companyLoginLink = page.getByTestId('company-register-login-link');
        this.companyTermsLink = page.getByTestId('company-register-terms-link');

        //Success Indicator after Login
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });

    }

    //Company Registration Navigation Method
    async navigateTo(baseUrl){
        await this.page.goto('${baseURL}/company/register');
        await this.page.waitForLoadState('networkidle');
    }


    //Action Methods

    async register(companyData , option ={}){

        if(!companyData.companyNameInput) {
            throw new Error('Company name is required for registration / Please fill out this field');
        }
        if(!companyData.companyContactPersonInput){
            throw new Error('Company Person is required / Please fill out this field');
        }
        if(!companyData.companyEmailRegisterInput) {
            throw new Error('Company Email is Required / Please fill out this field');
        }
        if(!companyData.companyMobileNumberInput) {
            throw new Error('Company Mobile Number / Please fill out this field');
        }
        if(!companyData.companyPasswordInput) {
            throw new Error('Company Password is Required / Please fill out this field');
        }

        console.log('Registering Company: ${companyData.companyName}');
///////////////////////////////////-----------------------       console.log('Admin email:${companyData.email}');          --------------------------//////////////////////////

        //Company Information
        await this.fillCompanyInformation(companyData);

        // Admin Account Information
///////////////////////////////////----------------------        await this.fillAdminInformation(companyData);              ---------------------////////////////////////////

        //Terms and Conditions

        if(companyData.acceptTerms !== false){
            await this.acceptTerms();
        }

        //Submit Registration
        await this.submitRegistration(option);
    }

    //fill company information
    async fillCompanyInformation(companyData){
        // Company Name
        if(companyData.companyNameInput){
            await this.companyNameInput.fill(companyData.companyNameInput);
        }
        if(companyData.companyContactPersonInput){
            await this.companyContactPersonInput.fill(companyData.companyContactPersonInput);
        }
        if(companyData.companyEmailRegisterInput){
            await this.companyEmailRegisterInput.fill(companyData.companyEmailRegisterInput);
        }
        if(companyData.companyMobileNumberInput){
            await this.companyMobileNumberInput.fill(companyData.companyMobileNumberInput);
        }
        if(companyData.companyPasswordInput){
            await this.companyPasswordInput.fill(companyData.companyPasswordInput);
        }
    }

}