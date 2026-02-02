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
