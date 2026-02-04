import {
  ApiError,
  AuthApi,
  AuthResponse,
  CommonApiErrorCode,
  isLoginErrorCode,
  isRegisterErrorCode,
  LoginErrorCode,
  LoginRequest,
  RegisterErrorCode,
  RegisterRequest
} from '@core/api/auth.api';
import { catchError, Observable, throwError } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/register';
const LOGOUT_URL = '/auth/logout';

export interface ProblemDetail {
  code: string;
  detail?: string;
}

function isProblemDetailBody (body: unknown): body is ProblemDetail {
  return !!body
    && typeof body === 'object'
    && 'code' in body
    && typeof body.code === 'string'
    && (!('detail' in body) || typeof body.detail === 'string');
}

function mapHttpErrorToApiError<DOMAIN_CODE extends string> (
  err: HttpErrorResponse,
  isDomainCode: (code: string) => code is DOMAIN_CODE
): ApiError<DOMAIN_CODE | CommonApiErrorCode> {

  const status = err.status;
  if (status === 0) return new ApiError('NETWORK_ERROR', undefined, status, err);
  const body = err.error;

  if (isProblemDetailBody(body)) {
    const rawCode = body.code;
    const detail = body.detail;
    if (isDomainCode(rawCode)) return new ApiError(rawCode, detail, status, err);
    return new ApiError('REQUEST_FAILED', detail ?? `Unknown error code: ${rawCode}`, status, err);
  }

  if (status === 401 || status === 403) return new ApiError('UNAUTHORIZED_NO_BODY', undefined, status, err);
  if (status === 404) return new ApiError('NOT_FOUND', undefined, status, err);
  return new ApiError('REQUEST_FAILED', undefined, status, err);
}

@Injectable()
export class AuthApiHttp extends AuthApi {
  private http = inject(HttpClient);

  override login (request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(LOGIN_URL, request, {withCredentials: true}).pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          return throwError(() => mapHttpErrorToApiError<LoginErrorCode>(err, isLoginErrorCode));
        }
        return throwError(() => new ApiError('UNEXPECTED_ERROR', undefined, undefined, err));
      })
    );
  }

  override logout (): Observable<void> {
    return this.http.post<void>(LOGOUT_URL, {}, {withCredentials: true});
  }

  override register (request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(REGISTER_URL, request, {withCredentials: true}).pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          return throwError(() => mapHttpErrorToApiError<RegisterErrorCode>(err, isRegisterErrorCode));
        }
        return throwError(() => new ApiError('UNEXPECTED_ERROR', undefined, undefined, err));
      })
    );
  }
}
