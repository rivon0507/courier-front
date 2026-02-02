import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthApi, AuthResponse, LoginRequest, RegisterRequest } from '@core/api/auth.api';
import { Credentials, SessionActivity, SignUpFormData, User } from '@core/session/session.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SessionStore {
  private api = inject(AuthApi);

  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed<boolean>(() => !!this.user());
  private _accessToken = signal<string | null>(null);
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
        error: (err) => this._error.set(err.message || "Connexion échouée"),
      });
  }

  register (signUpFormData: SignUpFormData): void {
    this._activity.set("register");
    this._error.set(null);

    this.api.register(signUpFormData as RegisterRequest)
      .pipe(finalize(() => this._activity.set(null)))
      .subscribe({
        next: (registerResponse) => this.setUserAndAccessToken(registerResponse),
        error: (err) => this._error.set(err.message || "Inscription échouée"),
      });
  }

  clearError(): void {
    this._error.set(null);
  }

  private setUserAndAccessToken (loginResponse: AuthResponse) {
    this._user.set(loginResponse.user);
    this._accessToken.set(loginResponse.accessToken);
  }
}
