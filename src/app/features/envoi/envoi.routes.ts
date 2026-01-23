import { Routes } from '@angular/router';
import { EnvoiApi } from '@core/api/envoi.api';
import { EnvoiPage } from './pages/envoi.page';
import { EnvoiApiMock } from '@core/api/envoi.api.mock';
import { EnvoiStore } from '@features/envoi/data/envoi.store';

export const envoiRoutes: Routes = [
  {
    path: '',
    component: EnvoiPage,
    title: 'Envoi',
    providers: [
      {provide: EnvoiApi, useClass: EnvoiApiMock},
      EnvoiStore
    ]
  }
];

