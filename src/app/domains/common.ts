export interface PieceCreateRequest {
  designation: string;
  quantite: number;
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

export interface PieceResponse {
  designation: string;
  id: number;
  quantite: number;
}
