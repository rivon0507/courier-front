import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { EnvoiComponent } from './envoi/envoi.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "envoi",
        component: EnvoiComponent,
        title: "Envoi"
      }
    ]
  }
];
