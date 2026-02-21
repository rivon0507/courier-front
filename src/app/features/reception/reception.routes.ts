import { Routes } from '@angular/router';
import { ReceptionPage } from './pages/reception.page';
import { ReceptionApi } from '@domains/reception/reception.api';
import { ReceptionStore } from '@domains/reception/reception.store';
import { ReceptionApiMock } from "@domains/reception/reception.api.mock";

export const receptionRoutes: Routes = [
  {
    path: '',
    component: ReceptionPage,
    title: 'Reception',
    providers: [
      {provide: ReceptionApi, useClass: ReceptionApiMock},
      ReceptionStore
    ]
  }
];
