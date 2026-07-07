const { expect } = require('@playwright/test');

class ForgotPasswordPage {
    constructor(page) {
        this.page = page;

        // HEADINGS AND TEXT ELEMENTS
        this.secureAccessBadge = page.getByText('Secure company access');
        this.resetHeading = page.getByRole('heading', { name: 'Reset company password' });
        this.resetDescription = page.getByText('We’ll email a one-time code');

        // FORM FIELDS
        this.emailInput = page.locator('input[id="email"]');
        this.sendCodeButton = page.locator('button[type="submit"]');

        // LINKS
        this.backToLoginLink = page.getByRole('link', { name: 'Back to company login' });

        // ERROR AND SUCCESS MESSAGES
        this.errorToast = page.getByText('Errorcompany not found');
        this.errorMessage = page.getByText('Errorcompany not found');
        this.successToast = page.locator('div').filter({ hasText: 'OTP SentPlease check your' }).nth(1);
        this.successMessage = page.locator('div').filter({ hasText: 'OTP SentPlease check your' }).nth(1);
    }

    // NAVIGATION METHODS
    async goTo(baseUrl) {
        const url = `${baseUrl}/company/forgot-password`;
        console.log(`Navigating to: ${url}`);
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async checkPageLoaded() {
        await expect(this.resetHeading).toBeVisible();
        await expect(this.resetDescription).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.sendCodeButton).toBeVisible();
        await expect(this.backToLoginLink).toBeVisible();
        console.log('Forgot password page loaded successfully');
    }

    // ACTION METHODS
    async requestResetCode(email) {
        console.log(`Requesting password reset for: ${email}`);
        await this.emailInput.fill(email);
        await this.sendCodeButton.click();
        console.log('Password reset code requested');
    }

    async clickBackToLogin() {
        await this.backToLoginLink.click();
        console.log('Clicked "Back to login" link');
    }

    async clearEmail() {
        await this.emailInput.clear();
    }

    // VERIFICATION METHODS
    async verifyCompanyNotFoundError() {
        console.log('Verifying "company not found" error...');
        await expect(this.errorToast).toBeVisible({ timeout: 5000 });
        await expect(this.errorMessage).toContainText('company not found');
        console.log('"Company not found" error verified');
    }

    async verifyError(expectedMessage) {
        console.log(`Verifying error: "${expectedMessage}"...`);
        await expect(this.errorToast).toBeVisible({ timeout: 5000 });
        await expect(this.errorMessage).toContainText(expectedMessage);
        console.log(`Error "${expectedMessage}" verified`);
    }

    async verifyResetRequestSuccess() {
        console.log('Verifying successful reset request...');
        await expect(this.successToast).toBeVisible({ timeout: 5000 });
        const message = await this.successMessage.textContent();
        console.log(`Success message: ${message}`);
        console.log('Reset request successful');
    }

    async verifyRedirectedToLogin() {
        await expect(this.page).toHaveURL(/.*company\/login/);
        const welcomeHeading = this.page.getByRole('heading', { name: 'Welcome back' });
        await expect(welcomeHeading).toBeVisible({ timeout: 5000 });
        console.log('Redirected to login page');
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

module.exports = { ForgotPasswordPage };