import { Injectable, inject, signal } from '@angular/core';
import { Reception } from '../models/reception.model';
import { ReceptionApi } from '@core/api/reception.api';

@Injectable()
export class ReceptionStore {
  private api = inject(ReceptionApi);

  private _receptions = signal<Reception[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly receptions = this._receptions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.list().subscribe({
      next: (receptions) => {
        this._receptions.set(receptions);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load receptions');
        this._loading.set(false);
      }
    });
  }

  create(reception: Reception): void {
    this._loading.set(true);

    this.api.create(reception).subscribe({
      next: (newReception) => {
        this._receptions.update(receptions => [...receptions, newReception]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create reception');
        this._loading.set(false);
      }
    });
  }

  update(reference: string, reception: Partial<Reception>): void {
    this._loading.set(true);

    this.api.update(reference, reception).subscribe({
      next: (updatedReception) => {
        this._receptions.update(receptions =>
          receptions.map(r => r.reference === reference ? updatedReception : r)
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update reception');
        this._loading.set(false);
      }
    });
  }

  remove(reference: string): void {
    this._loading.set(true);

    this.api.delete(reference).subscribe({
      next: () => {
        this._receptions.update(receptions =>
          receptions.filter(r => r.reference !== reference)
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete reception');
        this._loading.set(false);
      }
    });
  }
}
