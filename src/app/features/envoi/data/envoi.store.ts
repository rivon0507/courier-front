import { Injectable, inject, signal } from '@angular/core';
import { Envoi } from '../models/envoi.model';
import { EnvoiApi } from '@core/api/envoi.api';

@Injectable()
export class EnvoiStore {
  private api = inject(EnvoiApi);

  private _envois = signal<Envoi[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly envois = this._envois.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.list().subscribe({
      next: (envois) => {
        this._envois.set(envois);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to load envois');
        this._loading.set(false);
      }
    });
  }

  create(envoi: Omit<Envoi, 'id'>): void {
    this._loading.set(true);

    this.api.create(envoi).subscribe({
      next: (newEnvoi) => {
        this._envois.update(envois => [...envois, newEnvoi]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to create envoi');
        this._loading.set(false);
      }
    });
  }

  update(id: number, envoi: Partial<Envoi>): void {
    this._loading.set(true);

    this.api.update(id, envoi).subscribe({
      next: (updatedEnvoi) => {
        this._envois.update(envois =>
          envois.map(e => e.id === id ? updatedEnvoi : e)
        );
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to update envoi');
        this._loading.set(false);
      }
    });
  }

  remove(id: number): void {
    this._loading.set(true);

    this.api.delete(id).subscribe({
      next: () => {
        this._envois.update(envois => envois.filter(e => e.id !== id));
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message || 'Failed to delete envoi');
        this._loading.set(false);
      }
    });
  }
}
