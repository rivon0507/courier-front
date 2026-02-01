import { inject, Injectable, signal } from '@angular/core';
import { AuthApi, LoginRequest } from '@core/api/auth.api';
import { Credentials, SessionStatus, User } from '@core/session/session.model';

@Injectable()
export class SessionStore {
  private api = inject(AuthApi);

  private _user = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);
  private _status = signal<SessionStatus>("anonymous");
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly status = this._status.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  login (credentials: Credentials): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.login(credentials as LoginRequest).subscribe({
      next: (loginResponse) => {
        this._user.set(loginResponse.user);
        this._accessToken.set(loginResponse.accessToken);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || "Connexion échouée");
        this._loading.set(false);
      }
    });
  }

  clearError(): void {
    this._error.set(null);
  }
}
