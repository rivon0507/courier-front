import { Routes } from '@angular/router';
import { MainLayout } from '@layouts/main/main.layout';

export const routes: Routes = [
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
        path: "",
        redirectTo: "reception",
        pathMatch: "full"
      }
    ]
  }
];
