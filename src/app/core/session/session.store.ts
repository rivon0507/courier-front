import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthApi, AuthResponse, LoginRequest, RegisterRequest } from '@core/api/auth.api';
import { Credentials, SessionActivity, SignUpFormData, User } from '@core/session/session.model';
import { finalize } from 'rxjs';
import { NotificationService } from "@core/notification/notification.service";
import { err } from "@core/i18n/keys";
import { ApiError } from "@core/errors/api-error";
import { AppError } from "@core/errors/fallback-error";

@Injectable({
  providedIn: "root"
})
export class SessionStore {
  private api = inject(AuthApi);
  private notificationService = inject(NotificationService);

  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed<boolean>(() => !!this.user());
  private _accessToken = signal<string | null>(null);
  readonly accessToken = this._accessToken.asReadonly();
  private _activity = signal<SessionActivity | null>(null);
  readonly activity = this._activity.asReadonly();
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  login (credentials: Credentials): void {
    this._activity.set("login");
    this._error.set(null);

    this.api.login(credentials as LoginRequest)
      .pipe(finalize(() => this._activity.set(null)))
      .subscribe({
        next: (loginResponse) => this.setUserAndAccessToken(loginResponse),
        error: (e) => this.handleError(e, "login"),
      });
  }

  register (signUpFormData: SignUpFormData): void {
    this._activity.set("register");
    this._error.set(null);

    this.api.register(signUpFormData as RegisterRequest)
      .pipe(finalize(() => this._activity.set(null)))
      .subscribe({
        next: (registerResponse) => this.setUserAndAccessToken(registerResponse),
        error: (e) => this.handleError(e, "register"),
      });
  }

  clearError(): void {
    this._error.set(null);
  }

  logout (): void {
    this.api.logout().subscribe();
    this.clearSession();
  }

  clearSession () {
    this._user.set(null);
    this._accessToken.set(null);
  }

  setUserAndAccessToken (loginResponse: AuthResponse) {
    this._user.set(loginResponse.user);
    this._accessToken.set(loginResponse.accessToken);
  }

  private handleError (e: unknown, op: string) {
    const error: string =
      e instanceof ApiError ?
        err(`${op}.${e.code}`) :
        e instanceof AppError ?
          e.i18nKey :
          err("fallback.UNEXPECTED_ERROR");

    this._error.set(error);
    this.notificationService.notify({code: error, kind: "error"});
  }
}
