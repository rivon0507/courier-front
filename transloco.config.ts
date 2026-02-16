import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en', 'fr'],
  keysManager: {
    output: "public/i18n",
    unflat: true,
    defaultValue: "__MISSING__"
  }
};

export default config;
