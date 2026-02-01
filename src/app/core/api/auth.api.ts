import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: string;
  tokenType: string
  user: {
    email: string;
    displayName: string;
    role: string;
  }
}

export abstract class AuthApi {
  abstract login (request: LoginRequest): Observable<LoginResponse>;
}
