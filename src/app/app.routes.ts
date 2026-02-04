import { Routes } from '@angular/router';
import { MainLayout } from './layout/main/main.layout';
import { AuthLayout } from './layout/auth/auth.layout';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: "auth",
    component: AuthLayout,
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.authRoutes),
  },
  {
    path: "",
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: "envoi",
        loadChildren: () => import('./features/envoi/envoi.routes').then(m => m.envoiRoutes)
      },
      {
        path: "reception",
        loadChildren: () => import('./features/reception/reception.routes').then(m => m.receptionRoutes)
      },
      {
        path: "home",
        redirectTo: "/reception",
        pathMatch: "full",
      },
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      }
    ]
  }
];
