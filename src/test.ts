import { TranslocoTestingModule, TranslocoTestingOptions } from "@jsverse/transloco";
import en from "../public/i18n/en.json";
import fr from "../public/i18n/fr.json";

const noop = (): void => undefined;

export const mockMatchMedia = (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
  } as unknown as MediaQueryList);

export const input = (element: HTMLInputElement, value: string) => {
  element.value = value;
  element.dispatchEvent(new Event('input'));
};

export function getTranslocoModule (options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: {en, fr},
    translocoConfig: {
      availableLangs: ['en', 'fr'],
      defaultLang: 'fr',
    },
    preloadLangs: true,
    ...options,
  });
}
