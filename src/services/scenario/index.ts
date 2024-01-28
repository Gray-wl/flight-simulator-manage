import { SCENARIO_V1 } from '@/constants';
import request from '@/utils/request';

// 剧情列表分页查询
export const queryScenarioList = async (
  params: PaginationParams,
  data: ScenarioQueryParams,
) => request.get(`${SCENARIO_V1}/list`, params, { data });

// 新增剧情
export const addScenario = async (params: CreateScenarioDto) =>
  request.post(`${SCENARIO_V1}/add`, params);

// 修改剧情
export const modifyScenario = async (id: number, params: CreateScenarioDto) =>
  request.put(`${SCENARIO_V1}/modify/${id}`, params);

// 上下架/删除剧情
export const patchScenario = async ({ type, id }: PatchParamsDTO) =>
  request.patch(`${SCENARIO_V1}/${type}/${id}`);

// 导入剧情
export const importScenario = async (file: FormData) =>
  request.post(`${SCENARIO_V1}/import`, file);
