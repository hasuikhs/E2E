import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./global-setup'), // 모든 테스트 진행 전에 한번만 실행
  // globalTeardown: require.resolve('./global-setup'), // 모든 테스트 진행 후에 한번만 실행됨

  testDir: './tests',
  testMatch: '*.spec.ts', // 테스트 파일과 일치하는 패턴 또는 정규식 기본적으로 .*(test|spec).(js|ts|mjs) 파일 실행
  testIgnore: '*test-assets', // 테스트 파일을 찾을때 무시해야 하는 패턴 또는 정규식
  // timeout, // 타임아웃 기본값은 30_000ms
  // expect: {
  //   timeout, // expect에 대한 타임아웃 기본값은 5_000ms
  // },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [ 'list' ],
    [ 'html' ]
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    storageState: './.global-auth.json' // 로그인 정보를 담아두는 파일
  },

  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
