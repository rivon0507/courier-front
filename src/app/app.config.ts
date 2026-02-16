import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthApi } from '@core/api/auth.api';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from '@core/http/base-url-interceptor';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from "rxjs";
import { TranslocoHttpLoader } from "@core/i18n/transloco-loader";
import { AuthApiHttp } from "@core/api/auth.api.http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
    {provide: AuthApi, useClass: AuthApiHttp},
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        flatten: {aot: false},
      },
      loader: TranslocoHttpLoader
    }),
    provideAppInitializer(() => {
      const t = inject(TranslocoService);
      return firstValueFrom(t.selectTranslation(t.getDefaultLang()));
    }),
  ]
};
