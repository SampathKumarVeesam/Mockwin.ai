import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page){
        this.page = page ;

        //selectors work start
        this.companyWorkSpaceHeading = page.getByRole('heading', { name: 'Welcome back' });
        this.signInPrompt = page.getByText('Sign in to continue to your');

        //Form fields
        this.emailInput = page.getByTestId('company-login-email-input');
        this.passwordInput = page.getByTestId('company-login-password-input');
        this.signInButton = page.getByTestId('company-login-submit-button');

        //Links
        this.createAccountLink = page.getByTestId('company-login-register-link');

        //Success Indicator after Login
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    }

    //Navigation Methods
    async navigateTo(baseUrl){
        await this.page.goto('${baseURL}/company/login');
        await this.page.waitForLoadState('networkidle');
    }

    //Action Methods
    async login(email , password){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        //Even check in Visible test case
        await this.signInButton.click(); 
    
    }

    //Verification Methods

    async verifyLoginPageLoaded(){
        await expect(this.companyWorkSpaceHeading).toBeVisible();
        await expect(this.signInPrompt).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    }

    //Verify Successful company Login 

    async verifySuccessfullLogin(){

        //redirecting to dashboard
        await expect(this.page).toHaveURL(/.*dashboard/);

        //dashboard content is loaded
        await expect(this.dashboardHeader).toBeVisible(); 
    }

    //Click Create account link to navigate to registration Page

    async clickCreateAccount(){
        await this.createAccountLink.click();
    }
}