import { Observable } from 'rxjs';
import { Reception } from '@features/reception/models/reception.model';

export abstract class ReceptionApi {
  abstract list(): Observable<Reception[]>;

  abstract get (id: number): Observable<Reception>;
  abstract create(reception: Reception): Observable<Reception>;

  abstract update (id: number, reception: Reception): Observable<Reception>;

  abstract delete (id: number): Observable<void>;
}
