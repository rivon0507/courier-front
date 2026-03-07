import { Observable } from 'rxjs';
import { EnvoiCreateRequest, EnvoiDetailsResponse, EnvoiResponse, EnvoiUpdateRequest } from "@domains/envoi/envoi.dto";
import { Page, PageParams, PieceResponse } from "@domains/common";

export abstract class EnvoiApi {
  abstract list(page?: PageParams): Observable<Page<EnvoiResponse>>;

  abstract get(id: number): Observable<EnvoiResponse>;

  abstract create(envoi: EnvoiCreateRequest): Observable<EnvoiDetailsResponse>;

  abstract update(id: number, envoi: EnvoiUpdateRequest): Observable<EnvoiResponse>;

  abstract delete(id: number): Observable<void>;

  abstract getPieces(envoiId: number): Observable<PieceResponse[]>;
}
