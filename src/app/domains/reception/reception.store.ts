import { inject, Injectable, signal } from '@angular/core';
import { Reception, ReceptionCreateForm } from '@domains/reception/reception.model';
import { NotificationService } from "@core/notification/notification.service";
import { finalize } from "rxjs";
import { ReceptionApi } from "@domains/reception/reception.api";

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
        next: (receptions) => this._receptions.set(receptions._items),
        error: (err) => this.notificationService.notify(err.message || 'Failed to load receptions')
      });
  }

  create(reception: ReceptionCreateForm): void {
    this._loading.set(true);

    this.api.create(reception)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (newReception) => this._receptions.update(receptions => [...receptions, newReception.reception]),
        error: (err) => this.notificationService.notify(err.message || 'Failed to create reception')
      });
  }

  update (id: number, reception: Reception): void {
    this._loading.set(true);

    this.api.update(id, reception)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (updatedReception) => this._receptions.update(receptions => receptions.map(r => r.id === id ? updatedReception : r)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to update reception')
      });
  }

  remove (id: number): void {
    this._loading.set(true);

    this.api.delete(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: () => this._receptions.update(receptions => receptions.filter(r => r.id !== id)),
        error: (err) => this.notificationService.notify(err.message || 'Failed to delete reception')
    });
  }
}
