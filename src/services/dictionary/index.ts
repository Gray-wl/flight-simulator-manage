import { DICTIONARY } from '@/constants';
import { StatusType } from '@/constants/enum';
import request from '@/utils/request';

// 字典分页查询
export const queryDictionaryList = async (
  params: PaginationParams,
  data: DictionaryQueryParams,
) => request.get(`${DICTIONARY}/list`, params, { data });

export const queryDictionaryEnum = async (
  params: DictEnum,
  status?: StatusType,
) => request.get(`${DICTIONARY}/enum/${status}`, params);

// 新增字典
export const addDictionary = async (params: CreateDictionaryDto) =>
  request.post(`${DICTIONARY}/add`, params);

// 修改字典
export const modifyDictionary = async (
  id: number,
  params: CreateDictionaryDto,
) => request.put(`${DICTIONARY}/modify/${id}`, params);

// 删除字典
export const deleteDictionary = async ({ id }: DeleteDictionaryParams) =>
  request.patch(`${DICTIONARY}/${StatusType.DELETED}/${id}`);

// 导入字典
export const importDictionary = async (file: FormData) =>
  request.post(`${DICTIONARY}/import`, file);
