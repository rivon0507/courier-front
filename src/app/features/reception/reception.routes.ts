import { Routes } from '@angular/router';
import { ReceptionPage } from './pages/reception.page';
import { ReceptionApi } from '@core/api/reception.api';
import { ReceptionApiMock } from '@core/api/reception.api.mock';
import { ReceptionStore } from '@features/reception/data/reception.store';

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
