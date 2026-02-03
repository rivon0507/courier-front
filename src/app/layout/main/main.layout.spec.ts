import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MainLayout } from './main.layout';
import { mockMatchMedia } from '@test';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(() => {
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => mockMatchMedia(query),
      });
    }

    TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render the layout shell', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('mat-sidenav-container')).not.toBeNull();
    expect(element.querySelector('router-outlet')).not.toBeNull();
  });
});
