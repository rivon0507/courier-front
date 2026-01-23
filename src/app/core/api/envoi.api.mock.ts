import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Envoi } from '@features/envoi/models/envoi.model';
import { EnvoiApi } from './envoi.api';

const MOCK_DATA: Envoi[] = [
  { id: 1, dateEnvoi: '1997-12-12', destinataire: 'Raketaka', observation: "Pour demande d'affectation" },
  { id: 2, dateEnvoi: '2021-05-08', destinataire: 'John Doe', observation: 'Demande de stage' }
];

@Injectable()
export class EnvoiApiMock extends EnvoiApi {
  private data: Envoi[] = [...MOCK_DATA];
  private nextId = 3;

  list(): Observable<Envoi[]> {
    return of([...this.data]).pipe(delay(100));
  }

  get(id: number): Observable<Envoi> {
    const item = this.data.find(e => e.id === id);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Envoi ${id} not found`));
  }

  create(envoi: Omit<Envoi, 'id'>): Observable<Envoi> {
    const newEnvoi: Envoi = { ...envoi, id: this.nextId++ };
    this.data = [...this.data, newEnvoi];
    return of({ ...newEnvoi }).pipe(delay(100));
  }

  update(id: number, envoi: Partial<Envoi>): Observable<Envoi> {
    const index = this.data.findIndex(e => e.id === id);
    if (index === -1) return throwError(() => new Error(`Envoi ${id} not found`));
    const updated = { ...this.data[index], ...envoi };
    this.data = this.data.map(e => (e.id === id ? updated : e));
    return of({ ...updated }).pipe(delay(100));
  }

  delete(id: number): Observable<void> {
    this.data = this.data.filter(e => e.id !== id);
    return of(void 0).pipe(delay(100));
  }
}
