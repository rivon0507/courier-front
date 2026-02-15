import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthApiMock } from '@core/api/auth.api.mock';
import { AuthApi } from '@core/api/auth.api';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from '@core/http/base-url-interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
    {provide: AuthApi, useClass: AuthApiMock},
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideAppInitializer(() => {
      const t = inject(TranslocoService);
      return firstValueFrom(t.selectTranslation(t.getDefaultLang()));
    }),
  ]
};
