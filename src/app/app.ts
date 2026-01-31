import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  private readonly document = inject(DOCUMENT);
  private readonly mql =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  private readonly mqlListener = (event: MediaQueryListEvent) => {
    this.applyTheme(event.matches ? 'dark' : 'light');
  };

  constructor() {
    if (!this.mql) {
      return;
    }

    this.applyTheme(this.mql.matches ? 'dark' : 'light');
    this.mql.addEventListener('change', this.mqlListener);
  }
  ngOnDestroy (): void {
    if (!this.mql) {
      return;
    }
    this.mql.removeEventListener('change', this.mqlListener);
  }
  private applyTheme (mode: 'light' | 'dark'): void {
    const root = this.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }
}
