import { chromium, FullConfig } from '@playwright/test';
import LoginPage from './common/auth/LoginPage';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  const loginPage = new LoginPage(page, baseURL);
  await loginPage.login();

  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;