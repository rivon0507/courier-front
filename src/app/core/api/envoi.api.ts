import { Observable } from 'rxjs';
import { Envoi } from '@features/envoi/models/envoi.model';

export abstract class EnvoiApi {
  abstract list(): Observable<Envoi[]>;
  abstract get(id: number): Observable<Envoi>;
  abstract create(envoi: Omit<Envoi, 'id'>): Observable<Envoi>;
  abstract update(id: number, envoi: Partial<Envoi>): Observable<Envoi>;
  abstract delete(id: number): Observable<void>;
}
