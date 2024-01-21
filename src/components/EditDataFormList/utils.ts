import { queryDictEnum } from '@/utils/utils';

export const columns = [
  {
    type: 'Select',
    label: '逻辑',
    name: 'logicCode',
    required: true,
    request: async () => await queryDictEnum('logic'),
    show: ({ index }: EditDataFormListShowParams) => index !== 0,
  },
  {
    type: 'Select',
    label: '属性',
    name: 'attrCode',
    required: true,
    request: async () => await queryDictEnum('attr'),
  },
  {
    type: 'Select',
    label: '关系',
    name: 'relationCode',
    required: true,
    request: async () => await queryDictEnum('relation'),
  },
  {
    type: 'InputNumber',
    label: '数值',
    name: 'num',
    required: true,
  },
];
