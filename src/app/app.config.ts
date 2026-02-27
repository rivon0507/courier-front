import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthApi } from '@core/session/auth.api';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from '@core/http/base-url-interceptor';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from "rxjs";
import { TranslocoHttpLoader } from "@core/i18n/transloco-loader";
import { authInterceptor } from "@core/http/auth-interceptor";
import { refreshInterceptor } from "@core/http/refresh-interceptor";
import { RefreshCoordinator } from "@core/http/refresh.coordinator";
import { AuthApiHttp } from "@core/session/auth.api.http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor, authInterceptor, refreshInterceptor])),
    RefreshCoordinator,
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
