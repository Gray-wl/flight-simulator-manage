import ConfirmButton from '@/components/ConfirmButton';
import ProTable from '@/components/ProTable';
import UploadBtn from '@/components/UploadBtn';
import { initialModalState } from '@/constants';
import { StatusType, StatusTypeDesc } from '@/constants/enum';
import {
  importScenario,
  patchScenario,
  queryScenarioList,
} from '@/services/scenario';
import { downLoad, queryDictEnum } from '@/utils/utils';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
} from '@ant-design/pro-components';
import { Button, Form, InputNumber, message } from 'antd';
import { useCallback, useMemo, useReducer, useRef } from 'react';
import EditDrawer from './EditDrawer';

const ScenarioPage = () => {
  const [modalState, setModalState] = useReducer(
    (s: ModalState<ScenarioData>, n: Partial<ModalState<ScenarioData>>) => ({
      ...s,
      ...n,
    }),
    initialModalState,
  );
  const actionRef = useRef<ActionType>();

  const reloadTable = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  const handlePatchScenario = useCallback(
    async (params: PatchParamsDTO) => {
      await patchScenario(params);
      reloadTable();
      message.success(`${StatusTypeDesc[params.type]}成功！`);
    },
    [reloadTable],
  );

  const beforeSearchSubmit = useCallback(
    (params: ScenarioQueryParams & { _triggerAge?: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _triggerAge, ...extraParams } = params || {};
      return extraParams;
    },
    [],
  );

  const columns = useMemo<ProColumns<ScenarioData, 'text'>[]>(
    () => [
      {
        title: '序号',
        dataIndex: 'storyNo',
        hideInSearch: true,
        render: (_, _record, index) => index + 1,
      },
      {
        title: '剧情标题',
        dataIndex: 'storyTitle',
      },
      {
        title: '剧情类型',
        dataIndex: 'storyTypeCode',
        valueType: 'select',
        request: async () => await queryDictEnum('storyType'),
      },
      {
        title: '适用种族',
        dataIndex: 'raceCode',
        valueType: 'select',
        request: async () => await queryDictEnum('race'),
      },
      {
        title: '触发年龄',
        dataIndex: '_triggerAge',
        renderFormItem: () => (
          <div className="flex justify-center items-center">
            <Form.Item noStyle name="minAge">
              <InputNumber
                className="flex-1"
                min={0}
                max={999}
                placeholder="请输入"
              />
            </Form.Item>
            <span className="flex justify-center mx-[5px]">~</span>
            <Form.Item noStyle name="maxAge">
              <InputNumber
                className="flex-1"
                min={0}
                max={999}
                placeholder="请输入"
              />
            </Form.Item>
          </div>
        ),
        render: (dom, { minAge, maxAge }: ScenarioData) =>
          `${minAge ?? ''}${dom}${maxAge ?? ''}`,
      },
      {
        title: '天赋条件',
        dataIndex: 'talentIds',
        hideInSearch: true,
        render: (dom, { talents }: ScenarioData) =>
          talents?.length
            ? talents.map(({ talentTitle }) => talentTitle).join('、')
            : dom,
      },
      {
        title: '联动剧情',
        dataIndex: 'linkagePlotNames',
        hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        fixed: 'right',
        render: (_, record: ScenarioData) => [
          record.status === StatusType.OFFLINE ? (
            [
              <Button
                key="edit"
                type="link"
                size="small"
                onClick={() => {
                  setModalState({ visible: true, detailData: record });
                }}
              >
                编辑
              </Button>,
              <Button
                key="online"
                type="link"
                size="small"
                onClick={() =>
                  handlePatchScenario({
                    type: StatusType.ONLINE,
                    id: record.id,
                  })
                }
              >
                上架
              </Button>,
            ]
          ) : (
            <ConfirmButton
              key="offline"
              size="small"
              danger={false}
              onConfirm={() =>
                handlePatchScenario({ type: StatusType.OFFLINE, id: record.id })
              }
            >
              下架
            </ConfirmButton>
          ),
          record.status === StatusType.OFFLINE && (
            <ConfirmButton
              key="delete"
              size="small"
              onConfirm={() =>
                handlePatchScenario({ type: StatusType.DELETED, id: record.id })
              }
            />
          ),
        ],
      },
    ],
    [handlePatchScenario],
  );

  return (
    <PageContainer title="剧情管理">
      <ProTable<ScenarioData, ScenarioQueryParams>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalState({ visible: true })}
          >
            新增剧情
          </Button>,
          <UploadBtn
            key="import"
            importService={importScenario}
            importCallback={reloadTable}
          >
            导入剧情
          </UploadBtn>,
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={() =>
              downLoad(require('@/assets/files/scenario.xlsx'), '剧情模板.xlsx')
            }
          >
            下载模板
          </Button>,
        ]}
        beforeSearchSubmit={beforeSearchSubmit}
        querylistReq={queryScenarioList}
        columns={columns}
      />
      <EditDrawer
        {...modalState}
        reloadTable={reloadTable}
        onOpenChange={(visible) =>
          setModalState({ visible, ...(!visible ? { detailData: null } : {}) })
        }
      />
    </PageContainer>
  );
};

export default ScenarioPage;
