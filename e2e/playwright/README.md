# Playwright

- Node.js 16+

## 1. 설치

```bash
# npm
$ npm init playwright@latest

# yarn
$ yarn create playwright
```

## 2. 테스트

### 2.1 로그인 유지

- 해당 작업을 하고나면 테스트 전에 로그인을 미리 해두어 각 테스트에 로그인이 필요하지 않음

- `playwright.config.ts`

  ```typescript
  export default defineConfig({
    globalSetup: require.resolve('./global-setup'),
    globalTeardown: require.resolve('./global-setup'),
    ...
    use: {
      ...
      storageState: './.auth.json' // 로그인 정보를 담아두는 파일
    }
  });
  ```

- `global-setup.ts`

  ```typescript
  import { chromium, FullConfig } from '@playwright/test';

  async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;

    const browser = await chromium.launch();
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    // 로그인 로직

    await page.context().storageState({ path: storageState as string });
    await browser.close();
  }

  export default globalSetup;
  ```
