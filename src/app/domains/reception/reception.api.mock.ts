import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reception } from '@domains/reception/reception.model';
import {
  ReceptionApi
} from '@domains/reception/reception.api';
import {
  Page,
  PageParams, PieceResponse,
  ReceptionCreateRequest,
  ReceptionDetailsResponse,
  ReceptionResponse,
  ReceptionUpdateRequest
} from "@domains/reception/reception.dto";

const MOCK_DATA: Reception[] = [
  {id: 1, dateReception: '2023-07-25', expediteur: 'Rabe', reference: '001'},
  {id: 2, dateReception: '2026-01-15', expediteur: 'Rasoa', reference: '013'},
  {id: 3, dateReception: '2025-03-15', expediteur: 'RANDRIAMAMPIANDRA Tianarilanto Christian Mario Gabriel', reference: '014'},
];

@Injectable()
export class ReceptionApiMock extends ReceptionApi {
  private data: Reception[] = [...MOCK_DATA];

  list(page?: PageParams): Observable<Page<ReceptionResponse>> {
    const _items = [...this.data].sort().slice(page?.page ?? 0, page?.size ?? 10);
    const response: Page<ReceptionResponse> = {
      _items,
      _page: {pageIndex: 0, pageSize: 10, totalPages: 1, totalElements: this.data.length},
      _sort: {key: "dateReception", direction: "desc"}
    };
    return of(response).pipe(delay(100));
  }

  get (id: number): Observable<ReceptionResponse> {
    const item = this.data.find((r) => r.id === id);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Reception ${id} not found`));
  }

  create(reception: ReceptionCreateRequest): Observable<ReceptionDetailsResponse> {
    const lastId = this.data
      .map(r => r.id)
      .reduce((id1, id2) => Math.max(id1, id2), 0);
    const created = {...reception, id: lastId + 1};
    const {pieces: piecesToCreate, ...createdReception} = created;
    let pieceId = 0;
    const pieces: PieceResponse[] = piecesToCreate.map(p => ({id: ++pieceId, ...p}));
    this.data = [...this.data, created];
    return of({reception: {...createdReception}, pieces}).pipe(delay(100));
  }

  update(id: number, reception: ReceptionUpdateRequest): Observable<ReceptionResponse> {
    const index = this.data.findIndex((r) => r.id === id);
    if (index === -1) return throwError(() => new Error(`Reception ${id} not found`));

    const updated = {id: id, ...reception};
    this.data = this.data.map((r) => (r.id === id ? updated : r));
    return of({ ...updated }).pipe(delay(100));
  }

  delete (id: number): Observable<void> {
    this.data = this.data.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(100));
  }
}
