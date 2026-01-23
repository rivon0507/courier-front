import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
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
