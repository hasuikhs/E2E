import { Page } from '@playwright/test';
import { API } from '../APIs';

class LoginPage {
  constructor(private readonly page: Page, url: string = process.env.BASE_URL as string) {
    this.url = url;
  };

  readonly idForm = this.page.getByPlaceholder('ID 입력');
  readonly pwForm = this.page.getByPlaceholder('비밀번호 입력');
  url: string;

  async goto() {
    await this.page.goto(this.url);
  }

  async login() {
    await this.goto();
    await this.idForm.fill(process.env.USER_ID as string);
    await this.pwForm.fill(process.env.USER_PW as string);
    await this.pwForm.press('Enter');
    await this.page.waitForResponse(res => res.url().includes(API.LOGIN.CALL_LOGIN.URL) && res.status() === 200);
    await this.page.waitForResponse(res => res.url().includes(API.LOGIN.INIT_USER.URL) && res.status() === 200);
    await this.page.waitForResponse(res => res.url().includes(API.LOGIN.GET_MILEAGE_BY_USER_ID.URL) && res.status() === 200);
  }
}

export default LoginPage;