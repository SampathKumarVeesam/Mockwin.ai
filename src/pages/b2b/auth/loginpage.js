// import { expect } from "@playwright/test";

// export class LoginPage {
//     constructor(page){
//         this.page = page ;

//         //selectors work start
//         this.companyWorkSpaceHeading = page.getByRole('heading', { name: 'Welcome back' });
//         this.signInPrompt = page.getByText('Sign in to continue to your');

//         //Form fields
//         this.emailInput = page.getByTestId('company-login-email-input');
//         this.passwordInput = page.getByTestId('company-login-password-input');
//         this.signInButton = page.getByTestId('company-login-submit-button');

//         //Links
//         this.createAccountLink = page.getByTestId('company-login-register-link');

//         //Success Indicator after Login
//         this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
//     }

//     //Navigation Methods
//     async navigateTo(baseUrl){
//         await this.page.goto('${baseURL}/company/login');
//         await this.page.waitForLoadState('networkidle');
//     }

//     //Action Methods
//     async login(email , password){
//         await this.emailInput.fill(email);
//         await this.passwordInput.fill(password);
//         //Even check in Visible test case
//         await this.signInButton.click(); 
    
//     }

//     //Verification Methods

//     async verifyLoginPageLoaded(){
//         await expect(this.companyWorkSpaceHeading).toBeVisible();
//         await expect(this.signInPrompt).toBeVisible();
//         await expect(this.signInButton).toBeVisible();
//     }

//     //Verify Successful company Login 

//     async verifySuccessfullLogin(){

//         //redirecting to dashboard
//         await expect(this.page).toHaveURL(/.*dashboard/);

//         //dashboard content is loaded
//         await expect(this.dashboardHeader).toBeVisible(); 
//     }

//     //Click Create account link to navigate to registration Page

//     async clickCreateAccount(){
//         await this.createAccountLink.click();
//     }
// }







// // src/pages/b2b/auth/loginPage.js

// const { expect } = require('@playwright/test');

// class LoginPage {
//     constructor(page) {
//         this.page = page;

//         // ==========================================
//         // HEADINGS AND TEXT ELEMENTS
//         // ==========================================
        
//         this.companyWorkspaceBadge = page.getByText('Company workspace');
//         this.welcomeHeading = page.getByRole('heading', { name: 'Welcome back' });
//         this.signInDescription = page.getByText('Sign in to continue to your hiring dashboard');

//         // ==========================================
//         // FORM FIELDS
//         // ==========================================
        
//         this.emailInput = page.getByTestId('company-login-email-input');
//         this.passwordInput = page.getByTestId('company-login-password-input');
//         this.signInButton = page.getByTestId('company-login-submit-button');

//         // ==========================================
//         // LINKS
//         // ==========================================
        
//         this.forgotPasswordLink = page.getByTestId('company-login-forgot-password-link');
//         this.createAccountLink = page.getByTestId('company-login-register-link');

//         // ==========================================
//         // PASSWORD VISIBILITY TOGGLE
//         // ==========================================
        
//         this.showPasswordButton = page.locator('button[aria-label="Show password"]');
//         this.hidePasswordButton = page.locator('button[aria-label="Hide password"]');

//         // ==========================================
//         // SUCCESS INDICATORS
//         // ==========================================
        
//         this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        
//         // ==========================================
//         // ERROR MESSAGES
//         // ==========================================
        
//         this.errorMessage = page.locator('[data-testid="company-login-error-message"]');
//     }

//     // ==========================================
//     // NAVIGATION METHODS
//     // ==========================================

//     async goTo(baseUrl) {
//         const loginUrl = `${baseUrl}/company/login`;
//         console.log(`Navigating to: ${loginUrl}`);
        
//         await this.page.goto(loginUrl, {
//             timeout: 30000,
//             waitUntil: 'networkidle'
//         });
//         await this.page.waitForLoadState('networkidle');
//     }

//     async checkPageLoaded() {
//         await expect(this.welcomeHeading).toBeVisible({ timeout: 10000 });
//         await expect(this.signInDescription).toBeVisible({ timeout: 10000 });
//         await expect(this.emailInput).toBeVisible({ timeout: 10000 });
//         await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
//         await expect(this.signInButton).toBeVisible({ timeout: 10000 });
//         await expect(this.createAccountLink).toBeVisible({ timeout: 10000 });
//     }

//     // ==========================================
//     // LOGIN ACTIONS
//     // ==========================================

//     async login(email, password) {
//         if (!email || !password) {
//             throw new Error(`Invalid credentials: email=${email}, password=${password ? '***' : 'undefined'}`);
//         }
        
//         console.log(`Logging in with email: ${email}`);
        
//         try {
//             await this.emailInput.clear();
//             await this.emailInput.fill(email);
//             console.log('Email filled');
            
//             await this.passwordInput.clear();
//             await this.passwordInput.fill(password);
//             console.log('Password filled');
            
//             await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
//             await this.signInButton.click();
//             console.log('Login form submitted');
            
//             await Promise.race([
//                 this.page.waitForURL(/.*dashboard/, { timeout: 15000 }),
//                 this.page.waitForURL(/.*login/, { timeout: 15000 })
//             ]);
            
//             console.log('Navigation completed');
            
//         } catch (error) {
//             console.log('Login failed with error:', error.message);
//             throw error;
//         }
//     }

//     async clearForm() {
//         await this.emailInput.clear();
//         await this.passwordInput.clear();
//     }

//     // ==========================================
//     // VERIFICATION METHODS
//     // ==========================================

//     async verifySuccessfulLogin() {
//         console.log('Verifying successful login...');
        
//         try {
//             await expect(this.page).toHaveURL(/.*dashboard/, { timeout: 15000 });
//             console.log('Redirected to dashboard URL');
            
//             await expect(this.dashboardHeading).toBeVisible({ timeout: 10000 });
//             console.log('Dashboard heading is visible');
            
//             const cookies = await this.page.context().cookies();
//             const hasSessionCookie = cookies.some(
//                 cookie => cookie.name === 'sessionId' || 
//                          cookie.name === 'token' || 
//                          cookie.name === 'jwt' ||
//                          cookie.name === 'auth_token' ||
//                          cookie.name === 'connect.sid'
//             );
            
//             if (hasSessionCookie) {
//                 console.log('Session cookie found');
//             } else {
//                 console.log('Warning: No session cookie found');
//             }
            
//             console.log('Login verification completed successfully');
            
//         } catch (error) {
//             console.log('Login verification failed:', error.message);
//             throw error;
//         }
//     }

//     async verifyLoginFailure(expectedErrorMessage) {
//         console.log('Verifying login failure...');
        
//         try {
//             await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
//             console.log('Error message is visible');
            
//             if (expectedErrorMessage) {
//                 await expect(this.errorMessage).toContainText(expectedErrorMessage);
//                 console.log(`Error message contains: "${expectedErrorMessage}"`);
//             }
            
//             await expect(this.page).toHaveURL(/.*login/);
//             console.log('Still on login page');
            
//             await expect(this.page).not.toHaveURL(/.*dashboard/);
//             console.log('Not redirected to dashboard');
            
//             console.log('Login failure verification completed');
            
//         } catch (error) {
//             console.log('Login failure verification failed:', error.message);
//             throw error;
//         }
//     }

//     // ==========================================
//     // NAVIGATION HELPER METHODS
//     // ==========================================

//     async clickCreateAccountLink() {
//         await this.createAccountLink.click();
//         console.log('Clicked "Create account" link');
//     }

//     async clickForgotPasswordLink() {
//         await this.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
//         await this.forgotPasswordLink.click();
//         console.log('Clicked "Forgot password" link');
//     }

//     async takeScreenshot(name = 'login-page') {
//         await this.page.screenshot({
//             path: `reports/screenshots/${name}-${Date.now()}.png`,
//             fullPage: true
//         });
//         console.log(`Screenshot saved: ${name}`);
//     }
// }

// module.exports = { LoginPage };





/////////////////////////////////////////////////////////////////////////////////////





// src/pages/b2b/auth/loginPage.js

const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        // HEADINGS AND TEXT ELEMENTS
        this.companyWorkspaceBadge = page.getByText('Company workspace');
        this.welcomeHeading = page.getByRole('heading', { name: 'Welcome back' });
        this.signInDescription = page.getByText('Sign in to continue to your hiring dashboard');

        // FORM FIELDS
        this.emailInput = page.getByTestId('company-login-email-input');
        this.passwordInput = page.getByTestId('company-login-password-input');
        this.signInButton = page.getByTestId('company-login-submit-button');

        // LINKS
        this.forgotPasswordLink = page.getByTestId('company-login-forgot-password-link');
        this.createAccountLink = page.getByTestId('company-login-register-link');

        // PASSWORD VISIBILITY TOGGLE
        this.showPasswordButton = page.locator('button[aria-label="Show password"]');
        this.hidePasswordButton = page.locator('button[aria-label="Hide password"]');

        // SUCCESS INDICATORS
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        
        // ERROR MESSAGES
        this.errorMessage = page.getByTestId('company-login-error-message');
    }

    // NAVIGATION METHODS
    async goTo(baseUrl) {
        const loginUrl = `${baseUrl}/company/login`;
        console.log(`Navigating to: ${loginUrl}`);
        
        await this.page.goto(loginUrl, {
            timeout: 30000,
            waitUntil: 'networkidle'
        });
        await this.page.waitForLoadState('networkidle');
    }

    async checkPageLoaded() {
        await expect(this.welcomeHeading).toBeVisible({ timeout: 10000 });
        await expect(this.signInDescription).toBeVisible({ timeout: 10000 });
        await expect(this.emailInput).toBeVisible({ timeout: 10000 });
        await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
        await expect(this.signInButton).toBeVisible({ timeout: 10000 });
        await expect(this.createAccountLink).toBeVisible({ timeout: 10000 });
    }

    // LOGIN ACTIONS
    async login(email, password) {
        if (!email || !password) {
            throw new Error(`Invalid credentials: email=${email}, password=${password ? '***' : 'undefined'}`);
        }
        
        console.log(`Logging in with email: ${email}`);
        
        try {
            await this.emailInput.clear();
            await this.emailInput.fill(email);
            console.log('Email filled');
            
            await this.passwordInput.clear();
            await this.passwordInput.fill(password);
            console.log('Password filled');
            
            await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.signInButton.click();
            console.log('Login form submitted');
            
            await Promise.race([
                this.page.waitForURL(/.*dashboard/, { timeout: 15000 }),
                this.page.waitForURL(/.*login/, { timeout: 15000 })
            ]);
            
            console.log('Navigation completed');
            
        } catch (error) {
            console.log('Login failed with error:', error.message);
            throw error;
        }
    }

    async clearForm() {
        await this.emailInput.clear();
        await this.passwordInput.clear();
    }

    // VERIFICATION METHODS
    async verifySuccessfulLogin() {
        console.log('Verifying successful login...');
        
        try {
            await expect(this.page).toHaveURL(/.*dashboard/, { timeout: 15000 });
            console.log('Redirected to dashboard URL');
            
            await expect(this.dashboardHeading).toBeVisible({ timeout: 10000 });
            console.log('Dashboard heading is visible');
            
            const cookies = await this.page.context().cookies();
            const hasSessionCookie = cookies.some(
                cookie => cookie.name === 'sessionId' || 
                         cookie.name === 'token' || 
                         cookie.name === 'jwt' ||
                         cookie.name === 'auth_token' ||
                         cookie.name === 'connect.sid'
            );
            
            if (hasSessionCookie) {
                console.log('Session cookie found');
            } else {
                console.log('Warning: No session cookie found');
            }
            
            console.log('Login verification completed successfully');
            
        } catch (error) {
            console.log('Login verification failed:', error.message);
            throw error;
        }
    }

    async verifyLoginFailure(expectedErrorMessage) {
        console.log('Verifying login failure...');
        
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
            console.log('Error message is visible');
            
            if (expectedErrorMessage) {
                await expect(this.errorMessage).toContainText(expectedErrorMessage);
                console.log(`Error message contains: "${expectedErrorMessage}"`);
            }
            
            await expect(this.page).toHaveURL(/.*login/);
            console.log('Still on login page');
            
            await expect(this.page).not.toHaveURL(/.*dashboard/);
            console.log('Not redirected to dashboard');
            
            console.log('Login failure verification completed');
            
        } catch (error) {
            console.log('Login failure verification failed:', error.message);
            throw error;
        }
    }

    // NAVIGATION HELPER METHODS
    async clickCreateAccountLink() {
        await this.createAccountLink.click();
        console.log('Clicked "Create account" link');
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.forgotPasswordLink.click();
        console.log('Clicked "Forgot password" link');
    }

    // async takeScreenshot(name = 'login-page') {
    //     await this.page.screenshot({
    //         path: `reports/screenshots/${name}-${Date.now()}.png`,
    //         fullPage: true
    //     });
    //     console.log(`Screenshot saved: ${name}`);
    // }
}

module.exports = { LoginPage };