import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthApiMock } from '@core/api/auth.api.mock';
import { AuthApi } from '@core/api/auth.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: AuthApi, useClass: AuthApiMock},
  ]
};
