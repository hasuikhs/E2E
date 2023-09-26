import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/e2e/sample.html');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('SAMPLE PAGE');
});

test('get alert message', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/e2e/sample.html');

  // 경고창에 대한 
  page.on('dialog', async dialog => {
    const message = dialog.message();

    if (message === '이것은 경고! \n줄바꿈까지!') {
      await dialog.dismiss();
    } else if (message === '확인이 필요!') {
      await dialog.accept();
    }
  });
  // // Click the get started link.
  await page.getByRole('button', { name: '확인' }).click();
  await expect(page.locator('#pannel')).toHaveText('확인');
});
