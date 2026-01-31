import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { mockMatchMedia } from '@test';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => mockMatchMedia(query),
      });
    }

    TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(LayoutComponent);
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
