import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reception } from '@features/reception/models/reception.model';
import { ReceptionApi } from './reception.api';

const MOCK_DATA: Reception[] = [
  { dateReception: '2023-07-25', expediteur: 'Rabe', reference: '001' },
  { dateReception: '2026-01-15', expediteur: 'Rasoa', reference: '013' },
];

@Injectable()
export class ReceptionApiMock extends ReceptionApi {
  private data: Reception[] = [...MOCK_DATA];

  list(): Observable<Reception[]> {
    return of([...this.data]).pipe(delay(100));
  }

  get(reference: string): Observable<Reception> {
    const item = this.data.find((r) => r.reference === reference);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Reception ${reference} not found`));
  }

  create(reception: Reception): Observable<Reception> {
    this.data = [...this.data, { ...reception }];
    return of({ ...reception }).pipe(delay(100));
  }

  update(reference: string, reception: Partial<Reception>): Observable<Reception> {
    const index = this.data.findIndex((r) => r.reference === reference);
    if (index === -1) {
      return throwError(() => new Error(`Reception ${reference} not found`));
    }

    const updated: Reception = { ...this.data[index], ...reception };
    this.data = this.data.map((r) => (r.reference === reference ? updated : r));
    return of({ ...updated }).pipe(delay(100));
  }

  delete(reference: string): Observable<void> {
    const exists = this.data.some((r) => r.reference === reference);
    if (!exists) {
      return throwError(() => new Error(`Reception ${reference} not found`));
    }

    this.data = this.data.filter((r) => r.reference !== reference);
    return of(void 0).pipe(delay(100));
  }
}
