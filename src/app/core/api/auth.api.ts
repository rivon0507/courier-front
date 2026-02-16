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

  abstract logout (): Observable<void>;
}

/**
 * t(errors.login.AUTH_UNAUTHORIZED)
 */
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
