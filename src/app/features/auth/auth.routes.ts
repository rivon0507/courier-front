import { Routes } from '@angular/router';
import { LoginPage } from '@features/auth/pages/login/login.page';
import { SessionStore } from '@core/session/session.store';
import { AuthApi } from '@core/api/auth.api';
import { AuthApiMock } from '@core/api/auth.api.mock';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginPage,
    title: "Auth",
    providers: [
      SessionStore,
      {provide: AuthApi, useClass: AuthApiMock}
    ]
  }
]
