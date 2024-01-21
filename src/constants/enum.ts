export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

export enum StatusType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  DELETED = 'delete',
}

export const StatusTypeDesc = {
  [StatusType.ONLINE]: '上架',
  [StatusType.OFFLINE]: '下架',
  [StatusType.DELETED]: '删除',
};
