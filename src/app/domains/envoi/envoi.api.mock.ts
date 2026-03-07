import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { EnvoiApi } from '@domains/envoi/envoi.api';
import { Page, PageParams, PieceResponse } from "@domains/common";
import { EnvoiCreateRequest, EnvoiDetailsResponse, EnvoiResponse, EnvoiUpdateRequest } from "@domains/envoi/envoi.dto";
import { delay } from "rxjs/operators";

const ENVOIS: EnvoiResponse[] = [
  {id: 1, dateEnvoi: '2023-07-25', destinataire: 'Rabe', reference: '001', observation: "Demande d'emploi"},
  {id: 2, dateEnvoi: '2026-01-15', destinataire: 'Rasoa', reference: '013', observation: "Observation 1"},
  {id: 3, dateEnvoi: '2025-03-15', destinataire: 'Marc Faniry', reference: '014', observation: "Obs 2"},
];

const PIECES: (PieceResponse & { envoiId: number })[] = [
  {envoiId: 1, id: 1, designation: "Lettre de motivation", quantite: 1},
  {envoiId: 1, id: 2, designation: "Curriculum vitae", quantite: 2},
  {envoiId: 1, id: 3, designation: "Carte d'identité nationale", quantite: 1},
  {envoiId: 1, id: 4, designation: "Carte d'identité scolaire", quantite: 3},
  {envoiId: 1, id: 5, designation: "Passeport", quantite: 1},
  {envoiId: 1, id: 6, designation: "Copie d'acte de naissance", quantite: 1},
  {envoiId: 1, id: 7, designation: "Certificat de résidence", quantite: 2},
  {envoiId: 1, id: 8, designation: "Demande de stage", quantite: 1},
  {envoiId: 1, id: 9, designation: "Certificat de scolarité", quantite: 1},
  {envoiId: 1, id: 10, designation: "Diplôme de licence professionnelle", quantite: 1},
  {envoiId: 1, id: 11, designation: "Relevé de notes", quantite: 1},
  {envoiId: 1, id: 12, designation: "Fiche d'inscription", quantite: 3},
  {envoiId: 1, id: 13, designation: "Demande de VISA", quantite: 1},
  {envoiId: 2, id: 14, designation: "Carte d'identité nationale", quantite: 1},
];

@Injectable()
export class EnvoiApiMock extends EnvoiApi {
  private envois = [...ENVOIS];
  private pieces = [...PIECES];
  private nextId = 3;
  private nextPieceId = 15;

  override list(page?: PageParams): Observable<Page<EnvoiResponse>> {
    const _items = [...this.envois].sort().slice(page?.page ?? 0, page?.size ?? 10);
    const response: Page<EnvoiResponse> = {
      _items,
      _page: {pageIndex: 0, pageSize: 10, totalPages: 1, totalElements: this.envois.length},
      _sort: {key: "dateEnvoi", direction: "desc"}
    };
    return of(response).pipe(delay(100));
  }

  override get(id: number): Observable<EnvoiResponse> {
    const item = this.envois.find(env => env.id === id);
    return item
      ? of({ ...item }).pipe(delay(100))
      : throwError(() => new Error(`Envoi ${id} not found`));
  }

  override create(envoi: EnvoiCreateRequest): Observable<EnvoiDetailsResponse> {
    const createdEnvoi = {...envoi, id: this.nextId++};
    const piecesToCreate = envoi.pieces;
    const pieces: PieceResponse[] = piecesToCreate.map(p => ({id: this.nextPieceId++, ...p}));
    this.envois = [...this.envois, createdEnvoi];
    return of({envoi: {...createdEnvoi}, pieces}).pipe(delay(100));
  }

  override update(id: number, envoi: EnvoiUpdateRequest): Observable<EnvoiResponse> {
    const index = this.envois.findIndex(env => env.id === id);
    if (index === -1) return throwError(() => new Error(`Envoi ${id} not found`));

    const updated = {id: id, ...envoi};
    this.envois = this.envois.map(r => r.id === id ? updated : r);
    return of({ ...updated }).pipe(delay(100));

  }

  override delete(id: number): Observable<void> {
    this.envois = this.envois.filter(env => env.id !== id);
    return of(void 0).pipe(delay(100));
  }

  override getPieces(envoiId: number): Observable<PieceResponse[]> {
    const pieces = this.pieces.filter(p => p.envoiId === envoiId)
      .map(p => ({...p}));
    return of([...pieces]).pipe(delay(100));
  }
}
