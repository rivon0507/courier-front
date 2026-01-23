import { Observable } from 'rxjs';
import { Reception } from '@features/reception/models/reception.model';

export abstract class ReceptionApi {
  abstract list(): Observable<Reception[]>;
  abstract get(reference: string): Observable<Reception>;
  abstract create(reception: Reception): Observable<Reception>;
  abstract update(reference: string, reception: Partial<Reception>): Observable<Reception>;
  abstract delete(reference: string): Observable<void>;
}
