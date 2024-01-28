declare interface ModalState<T> {
  visible: boolean;
  detailData: T | null;
}

declare interface PaginationParams {
  current?: number;
  pageSize?: number;
}

declare interface PageListDTO<T> {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
  list: T[];
}

declare interface Result<T> {
  message: string;
  status: string;
  data: T;
}

declare type OptionType = 'online' | 'offline' | 'delete';

declare interface PatchParamsDTO {
  type: OptionType;
  id: number;
}
