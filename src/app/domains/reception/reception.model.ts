export interface Reception {
  id: number;
  dateReception: string;
  expediteur: string;
  reference: string;
}

export interface ReceptionCreateForm {
  dateReception: string;
  expediteur: string;
  reference: string;
  pieces: [];
}
