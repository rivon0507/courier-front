import { Routes } from '@angular/router';
import { LoginPage } from '@features/auth/pages/login/login.page';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginPage,
    title: "Auth",
  }
]
