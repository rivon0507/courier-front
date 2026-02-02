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
