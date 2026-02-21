import { Routes } from '@angular/router';
import { EnvoiApi } from '@domains/envoi/envoi.api';
import { EnvoiPage } from './pages/envoi.page';
import { EnvoiApiMock } from '@domains/envoi/envoi.api.mock';
import { EnvoiStore } from '@domains/envoi/envoi.store';

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

