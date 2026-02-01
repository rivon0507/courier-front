import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { mockMatchMedia } from '@test';
import { MainLayout } from '@layouts/main/main.layout';

describe('Router navigation', () => {
  beforeEach(() => {
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => mockMatchMedia(query),
      });
    }

    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      teardown: { destroyAfterEach: true },
    });
  });

  it('should render the layout component for all paths /', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', MainLayout);
    expect(component).toBeTruthy();
  });
});
