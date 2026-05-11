import { BasePage } from './BasePage';
import * as allure from "allure-js-commons";

export class ProductPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async applyFiltersAndSelect() {
        return await allure.step("Filtreleri uygula ve ürünü yeni sekmede aç", async () => {
            await this.page.locator('span.checkbox-label:has-text("Bershka")').waitFor({ state: 'visible' });
            await this.page.locator('span.checkbox-label').filter({ hasText: 'Bershka' }).click();

            const filtreKutusu = this.page.locator('[data-testid="scroll-container"]');
            await filtreKutusu.evaluate((el) => el.scrollBy(0, 300));

            await this.page.locator('h3:has-text("Renk")').waitFor({ state: 'visible' });
            await this.page.locator('h3:has-text("Renk")').click();

            await this.page.locator('[data-testid="color-list-item-text"]:has-text("Kırmızı")').waitFor({ state: 'visible' });
            await this.page.locator('[data-testid="color-list-item-text"]:has-text("Kırmızı")').click();

            await this.page.locator('[data-testid="product-card"]').nth(0).waitFor({ state: 'visible' });

            const [yeniSekme] = await Promise.all([
                this.page.waitForEvent('popup'), 
                this.page.locator('[data-testid="product-card"]').nth(0).click() 
            ]);
            await yeniSekme.waitForLoadState();
            return yeniSekme;
        });
    }
}