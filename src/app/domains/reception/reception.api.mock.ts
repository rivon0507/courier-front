import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ReceptionApi } from '@domains/reception/reception.api';
import {
  Page,
  PageParams,
  PieceResponse,
  ReceptionCreateRequest,
  ReceptionDetailsResponse,
  ReceptionResponse,
  ReceptionUpdateRequest
} from "@domains/reception/reception.dto";

const RECEPTIONS: ReceptionResponse[] = [
  {id: 1, dateReception: '2023-07-25', expediteur: 'Rabe', reference: '001'},
  {id: 2, dateReception: '2026-01-15', expediteur: 'Rasoa', reference: '013'},
  {id: 3, dateReception: '2025-03-15', expediteur: 'RANDRIAMAMPIANDRA Tianarilanto Christian Mario Gabriel', reference: '014'},
];

const PIECES: (PieceResponse & { receptionId: number })[] = [
  {receptionId: 1, id: 1, designation: "Lettre de motivation", quantite: 1},
  {receptionId: 1, id: 2, designation: "Curriculum vitae", quantite: 2},
  {receptionId: 1, id: 3, designation: "Carte d'identité nationale", quantite: 1},
  {receptionId: 1, id: 4, designation: "Carte d'identité scolaire", quantite: 1},
  {receptionId: 1, id: 5, designation: "Passeport", quantite: 1},
  {receptionId: 1, id: 6, designation: "Copie d'acte de naissance", quantite: 1},
  {receptionId: 1, id: 7, designation: "Certificat de résidence", quantite: 1},
  {receptionId: 1, id: 8, designation: "Demande de stage", quantite: 1},
  {receptionId: 1, id: 9, designation: "Certificat de scolarité", quantite: 1},
  {receptionId: 1, id: 10, designation: "Diplôme de licence professionnelle", quantite: 1},
  {receptionId: 1, id: 11, designation: "Relevé de notes", quantite: 1},
  {receptionId: 1, id: 12, designation: "Fiche d'inscription", quantite: 1},
  {receptionId: 1, id: 13, designation: "Demande de VISA", quantite: 1},
  {receptionId: 2, id: 14, designation: "Carte d'identité nationale", quantite: 1},
];

@Injectable()
export class ReceptionApiMock extends ReceptionApi {
  private receptions: ReceptionResponse[] = [...RECEPTIONS];
  private pieces = PIECES;

  override list(page?: PageParams): Observable<Page<ReceptionResponse>> {
    const _items = [...this.receptions].sort().slice(page?.page ?? 0, page?.size ?? 10);
    const response: Page<ReceptionResponse> = {
      _items,
      _page: {pageIndex: 0, pageSize: 10, totalPages: 1, totalElements: this.receptions.length},
      _sort: {key: "dateReception", direction: "desc"}
    };
    return of(response).pipe(delay(100));
  }

  override get(id: number): Observable<ReceptionResponse> {
    const item = this.receptions.find((r) => r.id === id);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Reception ${id} not found`));
  }

  override create(reception: ReceptionCreateRequest): Observable<ReceptionDetailsResponse> {
    const lastId = this.receptions
      .map(r => r.id)
      .reduce((id1, id2) => Math.max(id1, id2), 0);
    const created = {...reception, id: lastId + 1};
    const {pieces: piecesToCreate, ...createdReception} = created;
    let pieceId = 0;
    const pieces: PieceResponse[] = piecesToCreate.map(p => ({id: ++pieceId, ...p}));
    this.receptions = [...this.receptions, created];
    return of({reception: {...createdReception}, pieces}).pipe(delay(100));
  }

  override update(id: number, reception: ReceptionUpdateRequest): Observable<ReceptionResponse> {
    const index = this.receptions.findIndex((r) => r.id === id);
    if (index === -1) return throwError(() => new Error(`Reception ${id} not found`));

    const updated = {id: id, ...reception};
    this.receptions = this.receptions.map((r) => (r.id === id ? updated : r));
    return of({ ...updated }).pipe(delay(100));
  }

  override delete(id: number): Observable<void> {
    this.receptions = this.receptions.filter((r) => r.id !== id);
    return of(void 0).pipe(delay(100));
  }

  override getPieces(receptionId: number): Observable<PieceResponse[]> {
    const pieces = this.pieces.filter(p => p.receptionId === receptionId)
      .map(p => ({...p}));
    return of([...pieces]).pipe(delay(100));
  }
}
