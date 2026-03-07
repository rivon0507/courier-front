import { PieceCreateRequest, PieceResponse } from "@domains/common";

export interface ReceptionCreateRequest {
  dateReception: string;
  expediteur: string;
  pieces: PieceCreateRequest[];
  reference: string;
}

export interface ReceptionUpdateRequest {
  dateReception: string;
  expediteur: string;
  reference: string;
}

export interface ReceptionResponse {
  dateReception: string;
  expediteur: string;
  id: number;
  reference: string;
}

export interface ReceptionDetailsResponse {
  reception: ReceptionResponse;
  pieces: PieceResponse[];
}
