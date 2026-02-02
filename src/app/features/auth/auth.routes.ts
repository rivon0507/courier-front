import { Routes } from '@angular/router';
import { LoginPage } from '@features/auth/pages/login/login.page';
import { RegisterPage } from '@features/auth/pages/register/register.page';

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginPage,
    title: "Auth",
  },
  {
    path: "register",
    component: RegisterPage,
    title: "Register",
  }
]
