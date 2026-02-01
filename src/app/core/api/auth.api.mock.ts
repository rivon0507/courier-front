import { Injectable } from '@angular/core';
import { AuthApi, LoginRequest, LoginResponse } from '@core/api/auth.api';
import { Observable, of, throwError } from "rxjs";
import { delay } from 'rxjs/operators';
import { dematerialize, materialize } from 'rxjs/operators';

@Injectable()
export class AuthApiMock extends AuthApi {
  override login (request: LoginRequest): Observable<LoginResponse> {
    if (request.email != "user@example.com") {
      return throwError(() => new Error()).pipe(
        materialize(),
        delay(1200),
        dematerialize()
      );
    }

    return of<LoginResponse>({
      accessToken: 'fake-access-token',
      expiresIn: '600',
      tokenType: 'Bearer',
      user: {
        displayName: 'User',
        email: 'user@example.com',
        role: 'USER'
      }
    }).pipe(
      delay(1200)
    );
  }

}
