import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MainLayout } from './main.layout';
import { mockMatchMedia } from '@test';
import { AuthApi } from "@core/api/auth.api";
import { AuthApiMock } from '@core/api/auth.api.mock';
import { By } from '@angular/platform-browser';
import { SessionStore } from '@core/session/session.store';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;
  let router: Router;
  let sessionStore: SessionStore;

  beforeEach(() => {
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => mockMatchMedia(query),
      });
    }

    TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [
        provideRouter([]),
        {provide: AuthApi, useClass: AuthApiMock},
      ]
    });

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    sessionStore = TestBed.inject(SessionStore);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render the layout shell', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('mat-sidenav-container')).not.toBeNull();
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });

  it('should navigate to login page on logout button click', () => {
    const navigateByUrlSpy = vi.spyOn(router, "navigateByUrl");
    const logoutButton = fixture.debugElement.query(By.css("mat-nav-list button")).nativeElement as HTMLButtonElement;
    expect(logoutButton).toBeTruthy();
    logoutButton.click();
    expect(navigateByUrlSpy).toHaveBeenCalledExactlyOnceWith("/auth/login")
  });

  it('should clear session state on logout', () => {
    const logoutButton = fixture.debugElement.query(By.css("mat-nav-list button")).nativeElement as HTMLButtonElement;
    expect(logoutButton).toBeTruthy();
    logoutButton.click();
    fixture.detectChanges();
    expect(sessionStore.isAuthenticated()).toBeFalsy();
    expect(sessionStore.user()).toBeNull();
  });
});
