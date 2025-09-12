// @ts-check
import { test, expect } from '@playwright/test';


test('home page', async ({ page }) => {

    await page.goto("https://dev.questera.games/home");
    await expect(page).toHaveURL("https://dev.questera.games/home");
    await expect(page.getByText('Steps to get started')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
    
});