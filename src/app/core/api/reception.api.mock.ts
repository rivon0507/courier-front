import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reception } from '@features/reception/models/reception.model';
import { ReceptionApi } from './reception.api';

const MOCK_DATA: Reception[] = [
  {id: 1, dateReception: '2023-07-25', expediteur: 'Rabe', reference: '001'},
  {id: 2, dateReception: '2026-01-15', expediteur: 'Rasoa', reference: '013'},
];

@Injectable()
export class ReceptionApiMock extends ReceptionApi {
  private data: Reception[] = [...MOCK_DATA];

  list(): Observable<Reception[]> {
    return of([...this.data]).pipe(delay(100));
  }

  get (id: number): Observable<Reception> {
    const item = this.data.find((r) => r.id === id);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Reception ${id} not found`));
  }

  create (reception: Omit<Reception, "id">): Observable<Reception> {
    const lastId = this.data
      .map(r => r.id)
      .reduce((id1, id2) => Math.max(id1, id2), 0);
    const created = {...reception, id: lastId + 1};
    this.data = [...this.data, created];
    return of({...created}).pipe(delay(100));
  }

  update (id: number, reception: Reception): Observable<Reception> {
    const index = this.data.findIndex((r) => r.id === id);
    if (index === -1) return throwError(() => new Error(`Reception ${id} not found`));

    this.data = this.data.map((r) => (r.id === id ? reception : r));
    return of({ ...reception }).pipe(delay(100));
  }

  delete (id: number): Observable<void> {
    this.data = this.data.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(100));
  }
}
