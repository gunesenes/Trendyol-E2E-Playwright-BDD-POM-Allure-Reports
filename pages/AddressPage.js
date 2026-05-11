import { BasePage } from './BasePage';
import * as allure from "allure-js-commons";

export class AddressPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async loginAndFillAddress(email, password, adressData) {
        await allure.step("Giriş yap ve adres formunu doldur", async () => {
            const emailInput = this.page.locator('[data-testid="email-input"]');
            await emailInput.waitFor({ state: 'visible', timeout: 15000 });
            await emailInput.fill(email);
            await this.page.locator('[data-testid="email-check-button"]').click();

            const passInput = this.page.locator('[data-testid="login-password"]');
            await passInput.waitFor({ state: 'visible', timeout: 20000 });
            await passInput.click({ force: true });
            await passInput.fill(password);
            
            await this.page.locator('[data-testid="login-button"]').click();

            const confirmBtn = this.page.locator('.checkout-button-text-content', { hasText: 'Sepeti Onayla' });
            await confirmBtn.waitFor({ state: 'visible' });
            await confirmBtn.click();

            const continueBtn = this.page.locator('button.ty-plus-continue-without-add');
            await continueBtn.waitFor({ state: 'visible' });
            await continueBtn.click();

            await this.page.locator('input[name="name"]').waitFor({ state: 'visible' });
            await this.page.locator('input[name="name"]').fill(adressData.name);
            await this.page.locator('input[name="surname"]').fill(adressData.surname);
            await this.page.locator('input[name="phone"]').fill(adressData.phone);

            await this.selectDropdown('İl *', adressData.city);
            await this.selectDropdown('İlçe *', adressData.district);
            await this.selectDropdown('Mahalle *', adressData.neighborhood);

            await this.page.locator('textarea[name="addressLine"]').fill(adressData.fullAddress);
            await this.page.locator('input[name="addressName"]').fill(adressData.title);
            await this.page.locator('button', { hasText: 'Kaydet' }).click();
        });
    }

    async selectDropdown(label, value) {
        const input = this.page.locator('div[data-testid="select-input-container"]', { hasText: label }).locator('input');
        await input.waitFor({ state: 'visible' });
        await input.click();
        await input.pressSequentially(value, { delay: 100 });
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }
}