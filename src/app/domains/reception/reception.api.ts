import { Observable } from 'rxjs';
import {
  ReceptionCreateRequest,
  ReceptionDetailsResponse,
  ReceptionResponse,
  ReceptionUpdateRequest
} from "@domains/reception/reception.dto";
import { Page, PageParams, PieceResponse } from "@domains/common";

export abstract class ReceptionApi {
  abstract list(page?: PageParams): Observable<Page<ReceptionResponse>>;

  abstract get(id: number): Observable<ReceptionResponse>;

  abstract create(reception: ReceptionCreateRequest): Observable<ReceptionDetailsResponse>;

  abstract update(id: number, reception: ReceptionUpdateRequest): Observable<ReceptionResponse>;

  abstract delete(id: number): Observable<void>;

  abstract getPieces(receptionId: number): Observable<PieceResponse[]>;
}
