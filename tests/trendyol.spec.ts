import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';
import { AddressPage } from '../pages/AddressPage';
import * as allure from "allure-js-commons";

test('Trendyol E2E - Automation', async ({ page }) => {
    test.setTimeout(180000);

    // npx playwright test --ui

    // npx allure serve allure-results
    
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.openAndSelectGender();
    await homePage.searchProduct('kazak');

    const yeniSekme = await productPage.applyFiltersAndSelect();
    const basketPage = new BasketPage(yeniSekme);
    const addressPage = new AddressPage(yeniSekme);

    const filtreKutusu = page.locator('[data-testid="scroll-container"]');
    await basketPage.setLocationAndAddToCart(filtreKutusu);

    await allure.step("Sepete git ve ödeme ekranına ilerle", async () => {
      
        await yeniSekme.mouse.wheel(0, -5000);
        const basketCount = yeniSekme.locator('.basket-count', { hasText: '1' });
        await basketCount.waitFor({ state: 'visible', timeout: 15000 });

        await yeniSekme.locator('a[href="/sepetim"]').first().click();
        await yeniSekme.waitForLoadState('load'); 

        const checkoutBtn = yeniSekme.locator('button[data-testid="checkout-button"]');
        await checkoutBtn.waitFor({ state: 'visible' });
        await checkoutBtn.click();
        
        const loginLink = yeniSekme.locator('a.no-account-modal-content-buttons-button', { hasText: 'Giriş Yap / Üye Ol' });
        await loginLink.waitFor({ state: 'visible' });
        await loginLink.click();
    });

    await addressPage.loginAndFillAddress('ahmetcan54677@gmail.com', 'Kayseri38tr.', {
        name: 'Enes',
        surname: 'Gunes',
        phone: '5458359698',
        city: 'İstanbul',
        district: 'Esenler',
        neighborhood: 'Turgut',
        fullAddress: 'Fatih Mahallesi, Atatürk Caddesi, No:38, Daire:5',
        title: `Test${Math.floor(Math.random() * 999) + 1}`
    });

    await allure.step("Test verilerini temizle ve sepeti boşalt", async () => {
        const closeIcon = yeniSekme.locator('.close-icon.icon-red-void').first();
        if (await closeIcon.isVisible()) {
            await closeIcon.click();
        }
        await yeniSekme.goBack();
        await yeniSekme.locator('.remove-item-container', { hasText: 'Sil' }).click();
    });
});