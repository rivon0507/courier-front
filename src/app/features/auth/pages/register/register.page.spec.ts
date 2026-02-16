import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPage } from './register.page';
import { AuthApi } from '@core/api/auth.api';
import { AuthApiMock, MOCK_API_DELAY } from '@core/api/auth.api.mock';
import { provideRouter, Router } from '@angular/router';
import { getTranslocoModule, input } from '@test';
import { SessionStore } from '@core/session/session.store';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let sessionStore: SessionStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage, getTranslocoModule()],
      providers: [
        provideRouter([]),
        {provide: MOCK_API_DELAY, useValue: 0},
        {provide: AuthApi, useClass: AuthApiMock},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
    router = TestBed.inject(Router);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to /home after register success', async () => {
    const navigateByUrlSpy = vi.spyOn(router, "navigateByUrl");
    const registerSpy = vi.spyOn(sessionStore, 'register');
    await submitFormWith({email: "newuser@example.com", password: "password", confirm: "password", name: "New"});
    expect(registerSpy).toHaveBeenCalledExactlyOnceWith({email: "newuser@example.com", password: "password", displayName: "New"});
    expect(navigateByUrlSpy).toHaveBeenCalledExactlyOnceWith("/home");
  });

  it('should show error if register fails', async () => {
    const navigateByUrlSpy = vi.spyOn(router, "navigateByUrl");
    const registerSpy = vi.spyOn(sessionStore, 'register');
    await submitFormWith({email: "user@example.com", password: "password", confirm: "password", name: "Other"});
    expect(registerSpy).toHaveBeenCalledExactlyOnceWith({email: "user@example.com", password: "password", displayName: "Other"});
    expect(navigateByUrlSpy).toHaveBeenCalledTimes(0);
  });

  async function submitFormWith (
    {email, name, password, confirm}: { email: string, password: string, name: string, confirm: string }
  ) {
    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector("input[type='text']") as HTMLInputElement;
    const emailInput = element.querySelector("input[type='email']") as HTMLInputElement;
    const passwordInput = element.querySelector("input[formControlName='password']") as HTMLInputElement;
    const confirmInput = element.querySelector("input[formControlName='passwordConfirm']") as HTMLInputElement;
    const submitButton = element.querySelector("button[type='submit']") as HTMLButtonElement;

    input(nameInput, name);
    input(emailInput, email);
    input(passwordInput, password);
    input(confirmInput, confirm);

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
    submitButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
  }
});
