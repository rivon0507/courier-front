import { Routes } from '@angular/router';
import { MainLayout } from '@layouts/main/main.layout';
import { AuthLayout } from '@layouts/auth/auth.layout';

export const routes: Routes = [
  {
    path: "auth",
    component: AuthLayout,
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.authRoutes),
  },
  {
    path: "",
    component: MainLayout,
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
        redirectTo: "/auth/login",
        pathMatch: "full"
      }
    ]
  }
];
