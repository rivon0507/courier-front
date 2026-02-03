import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string
  user: {
    email: string;
    displayName: string;
    role: string;
  }
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export abstract class AuthApi {
  abstract login (request: LoginRequest): Observable<AuthResponse>;
  abstract register (request: RegisterRequest): Observable<AuthResponse>;
}

export class ApiError<CODE extends string> extends Error {
  readonly kind = 'api-error' as const;

  constructor (
    public readonly code: CODE,
    public readonly detail?: string,
    public readonly status?: number,
    cause?: unknown
  ) {
    super(code, {cause: cause});
    this.name = 'ApiError';
  }
}

/**
 * Transport-level fallback codes. These are not "backend business codes",
 * but codes the frontend uses when the backend response body is missing/unreadable.
 */
export const COMMON_API_ERROR_CODES = [
  'NETWORK_ERROR',
  'UNEXPECTED_ERROR',
  'UNAUTHORIZED_NO_BODY',
  'NOT_FOUND',
  'REQUEST_FAILED',
] as const;

export type CommonApiErrorCode = typeof COMMON_API_ERROR_CODES[number];

export const LOGIN_ERROR_CODES = [
  'AUTH_UNAUTHORIZED',
] as const;

export type LoginErrorCode = typeof LOGIN_ERROR_CODES[number];

export function isLoginErrorCode (code: string): code is LoginErrorCode {
  return (LOGIN_ERROR_CODES as readonly string[]).includes(code);
}

export const REGISTER_ERROR_CODES = [
  'EMAIL_ALREADY_TAKEN',
] as const;

export type RegisterErrorCode = typeof REGISTER_ERROR_CODES[number];

export function isRegisterErrorCode (code: string): code is RegisterErrorCode {
  return (REGISTER_ERROR_CODES as readonly string[]).includes(code);
}
