export interface ReceptionCreateRequest {
  dateReception: string;
  expediteur: string;
  pieces: PieceCreateRequest[];
  reference: string;
}

export interface PieceCreateRequest {
  designation: string;
  quantite: number;
}

export interface ReceptionUpdateRequest {
  dateReception: string;
  expediteur: string;
  reference: string;
}

export interface PageParams {
  page?: number;
  size?: number;
  sortDirection?: "asc" | "desc";
  sortKey?: string;
}

export interface Page<T> {
  _items: T[];
  _page: PageInfo;
  _sort: SortInfo;
}

export interface SortInfo {
  direction: "asc" | "desc";
  key: string;
}

export interface PageInfo {
  pageIndex: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ReceptionResponse {
  dateReception: string;
  expediteur: string;
  id: number;
  reference: string;
}

export interface PieceResponse {
  id: number;
  designation: string;
  quantite: number;
}

export interface ReceptionDetailsResponse {
  reception: ReceptionResponse;
  pieces: PieceResponse[];
}
