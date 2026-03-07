import { PieceCreateRequest, PieceResponse } from "@domains/common";

export interface EnvoiCreateRequest {
  dateEnvoi: string;
  destinataire: string;
  observation: string;
  pieces: PieceCreateRequest[];
  reference: string;
}

export interface EnvoiResponse {
  dateEnvoi: string;
  destinataire: string;
  id: number;
  observation: string;
  reference: string;
}

export interface EnvoiUpdateRequest {
  dateEnvoi: string;
  destinataire: string;
  observation: string;
  reference: string;
}

export interface EnvoiDetailsResponse {
  envoi: EnvoiResponse;
  pieces: PieceResponse[];
}
