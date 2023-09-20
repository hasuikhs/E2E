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

### 2.2 선택자
- 선택자를 이용하여 요소를 선택하면, 다양한 상호작용이 가능한 함수를 사용 가능
  - `click()`, `type()`, `fill()`, `press()`, `check()`, `selectOption()`, `hover()` 등
#### 2.2.1 locator

- 웹 페이지에서 요소를 찾고 상호작용하기 위함
- CSS Selector, XPath 등 다양한 방법 사용 가능

- `page.locator(selector)`
  - 페이지에서 요소 찾기
  ```javascript
  const element = await page.locator('button.my-button');
  ```

- `element.locator(selector)`
  - 요소 내에서 하위 요소 찾기
  ```javascript
  const button = await element.locator('button');
  ```

- `element.locatorAll(selector)`
  - 요소 내에서 하위 요소 중 여러 개의 요소 모두 찾기
  ```javascript
  const buttons = await element.locatorAll('button');
  ```