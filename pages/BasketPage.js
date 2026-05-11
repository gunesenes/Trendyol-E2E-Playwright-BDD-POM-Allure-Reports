import { BasePage } from './BasePage';
import * as allure from "allure-js-commons";

export class BasketPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async setLocationAndAddToCart(filtreKutusu) {
        await allure.step("Konum seç ve sepete ekle", async () => {
            await filtreKutusu.evaluate((el) => el.scrollBy(0, 600));

            await this.page.locator('.onboarding__default-renderer-primary-button').waitFor({ state: 'visible' });
            await this.page.locator('.onboarding__default-renderer-primary-button').click();

            await this.page.locator('[data-testid="button"]', { hasText: 'Konum Seç' }).waitFor({ state: 'visible' });
            await this.page.locator('button.location-select-button').click();

            await this.page.locator('button.apply-button').waitFor({ state: 'visible' });
            await this.page.locator('button.location-item-select-button').filter({ hasText: 'İl Seçin' }).click();

            await this.page.locator('input.dropdown-search-input[placeholder="Ara"]').waitFor({ state: 'visible' });
            await this.page.locator('input.dropdown-search-input[placeholder="Ara"]').fill('istanbul');

            await this.page.locator('div.dropdown-option').filter({ hasText: 'İstanbul' }).waitFor({ state: 'visible' });
            await this.page.locator('div.dropdown-option').filter({ hasText: 'İstanbul' }).click();

            await this.page.locator('button.location-item-select-button').filter({ hasText: 'İlçe Seçin' }).waitFor({ state: 'visible' });
            await this.page.locator('button.location-item-select-button').filter({ hasText: 'İlçe Seçin' }).click();

            await this.page.locator('input.dropdown-search-input[placeholder="Ara"]').waitFor({ state: 'visible' });
            await this.page.locator('input.dropdown-search-input[placeholder="Ara"]').click();
            await this.page.locator('input.dropdown-search-input[placeholder="Ara"]').fill('Esenler');
            await this.page.locator('div.dropdown-option').filter({ hasText: 'Esenler' }).click();

            await this.page.locator('button.apply-button').waitFor({ state: 'visible' });
            await this.page.locator('button.apply-button').click();

            await this.page.locator('span.info-text', { hasText: /.*kapında!/ }).waitFor({ state: 'visible' });
            await this.page.locator('button.add-to-cart-button').first().click();
        });
    }
}