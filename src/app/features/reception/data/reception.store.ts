import { inject, Injectable, signal } from '@angular/core';
import { Reception } from '../models/reception.model';
import { ReceptionApi } from '@core/api/reception.api';
import { NotificationService } from "@core/notification/notification.service";
import { finalize } from "rxjs";

@Injectable()
export class ReceptionStore {
  private api = inject(ReceptionApi);
  private notificationService = inject(NotificationService);

  private _receptions = signal<Reception[]>([]);
  readonly receptions = this._receptions.asReadonly();
  private _loading = signal<boolean>(false);
  readonly loading = this._loading.asReadonly();

  load(): void {
    this._loading.set(true);

    this.api.list()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (receptions) => this._receptions.set(receptions),
        error: (err) => this.notificationService.notify(err.message || 'Failed to load receptions')
      });
  }

  create(reception: Reception): void {
    this._loading.set(true);

    this.api.create(reception)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (newReception) => this._receptions.update(receptions => [...receptions, newReception]),
        error: (err) => this.notificationService.notify(err.message || 'Failed to create reception')
      });
  }

  update(reference: string, reception: Partial<Reception>): void {
    this._loading.set(true);

    this.api.update(reference, reception)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (updatedReception) => this._receptions.update(receptions => receptions.map(r => r.reference === reference ? updatedReception : r)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to update reception')
      });
  }

  remove(reference: string): void {
    this._loading.set(true);

    this.api.delete(reference)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: () => this._receptions.update(receptions => receptions.filter(r => r.reference !== reference)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to delete reception')
    });
  }
}
