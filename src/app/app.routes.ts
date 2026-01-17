import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EnvoiComponent } from './envoi/envoi.component';
import { ReceptionComponent } from './reception/reception.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "envoi",
        component: EnvoiComponent,
        title: "Envoi"
      },
      {
        path: "reception",
        component: ReceptionComponent,
        title: "Reception"
      }
    ]
  }
];
