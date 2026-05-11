import { BasePage } from './BasePage';
import * as allure from "allure-js-commons";

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
    }

    async openAndSelectGender() {
        await allure.step("Ana sayfayı aç ve Erkek seç", async () => {
            await this.page.goto('https://www.trendyol.com/');
            await this.page.locator('#onetrust-accept-btn-handler').waitFor({ state: 'visible' });
            await this.page.locator('#onetrust-accept-btn-handler').click();
            await this.page.getByText("Aradığın her şey Trendyol'da!").waitFor({ state: 'visible' });
            await this.page.locator('.gender-card-action').filter({ hasText: 'Erkek' }).click();
            await this.page.waitForLoadState('load');
        });
    }

    async searchProduct(keyword) {
        await allure.step(`Ürün ara: ${keyword}`, async () => {
            await this.page.getByText('Ürün, kategori veya marka ara').click();
            await this.page.locator('input[placeholder="Ürün, kategori veya marka ara"]').fill(keyword);
            await this.page.keyboard.press('Enter');
        });
    }
}