import { TALENT_V1 } from '@/constants';
import request from '@/utils/request';

// 天赋列表分页查询
export const queryTalentList = async (
  params: TalentQueryParams & PaginationParams,
) => request.get(`${TALENT_V1}/list`, params);

// 新增天赋
export const addTalent = async (params: CreateTalentDto) =>
  request.post(`${TALENT_V1}/add`, params);

// 修改天赋
export const modifyTalent = async (id: number, params: CreateTalentDto) =>
  request.put(`${TALENT_V1}/modify/${id}`, params);

// 上下架/删除天赋
export const patchTalent = async ({ type, id }: PatchParamsDTO) =>
  request.patch(`${TALENT_V1}/${type}/${id}`);

// 导入天赋
export const importTalent = async (file: FormData) =>
  request.post(`${TALENT_V1}/import`, file);
