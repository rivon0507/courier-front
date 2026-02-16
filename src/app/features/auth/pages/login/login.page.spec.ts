import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';
import { AuthApi } from '@core/api/auth.api';
import { AuthApiMock, MOCK_API_DELAY } from '@core/api/auth.api.mock';
import { provideRouter, Router } from '@angular/router';
import { SessionStore } from '@core/session/session.store';
import { By } from '@angular/platform-browser';
import { getTranslocoModule, input } from '@test';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let sessionStore: SessionStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [LoginPage, getTranslocoModule()],
      providers: [
        {provide: AuthApi, useClass: AuthApiMock},
        {provide: MOCK_API_DELAY, useValue: 0},
        provideRouter([]),
      ]
    })

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
    router = TestBed.inject(Router);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to /home after login success', async () => {
    const navigateByUrlSpy = vi.spyOn(router, "navigateByUrl");
    const loginSpy = vi.spyOn(sessionStore, 'login');
    await submitFormWith({email: "user@example.com", password: "password"});
    expect(loginSpy).toHaveBeenCalledExactlyOnceWith({email: "user@example.com", password: "password"});
    expect(navigateByUrlSpy).toHaveBeenCalledExactlyOnceWith("/home");
  });

  it('should show error if login fails', async () => {
    const navigateByUrlSpy = vi.spyOn(router, "navigateByUrl");
    const loginSpy = vi.spyOn(sessionStore, 'login');
    await submitFormWith({email: "fake@example.com", password: "password"});
    expect(loginSpy).toHaveBeenCalledExactlyOnceWith({email: "fake@example.com", password: "password"});
    expect(navigateByUrlSpy).toHaveBeenCalledTimes(0);
    expect(fixture.debugElement.query(By.css("[fontIcon='error_outline']")).nativeElement).toBeTruthy();
  });

  async function submitFormWith ({email, password}: { email: string, password: string }) {
    const element: HTMLElement = fixture.nativeElement;
    const emailInput = element.querySelector("input[type='email']") as HTMLInputElement;
    const passwordInput = element.querySelector("input[type='password']") as HTMLInputElement;
    const submitButton = element.querySelector("button[type='submit']") as HTMLButtonElement;

    input(emailInput, email);
    input(passwordInput, password);

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
  }
});
