import { inject, Injectable, signal } from '@angular/core';
import { Envoi } from '../models/envoi.model';
import { EnvoiApi } from '@core/api/envoi.api';
import { finalize } from "rxjs";
import { NotificationService } from "@core/notification/notification.service";

@Injectable()
export class EnvoiStore {
  private api = inject(EnvoiApi);
  private notificationService = inject(NotificationService);

  private _envois = signal<Envoi[]>([]);
  readonly envois = this._envois.asReadonly();
  private _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  load(): void {
    this._loading.set(true);

    this.api.list()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (envois) => this._envois.set(envois),
        error: (err) => this.notificationService.notify(err.message || 'Failed to load envois')
      });
  }

  create(envoi: Omit<Envoi, 'id'>): void {
    this._loading.set(true);

    this.api.create(envoi)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (newEnvoi) => this._envois.update(envois => [...envois, newEnvoi]),
        error: (err) => this.notificationService.notify(err.message || 'Failed to create envoi')
      });
  }

  update(id: number, envoi: Partial<Envoi>): void {
    this._loading.set(true);

    this.api.update(id, envoi)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (updatedEnvoi) => this._envois.update(envois => envois.map(e => e.id === id ? updatedEnvoi : e)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to update envoi')
    });
  }

  remove(id: number): void {
    this._loading.set(true);

    this.api.delete(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: () => this._envois.update(envois => envois.filter(e => e.id !== id)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to delete envoi')
      });
  }
}
