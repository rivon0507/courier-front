export interface Envoi {
  dateEnvoi: string;
  destinataire: string;
  id: number;
  observation: string;
  reference: string;
}

export interface EnvoiCreateForm {
  dateEnvoi: string;
  destinataire: string;
  observation: string;
  pieces: [];
  reference: string;
}

export interface EnvoiPiece {
  id: number;
  nature: string;
  quantite: number;
}

