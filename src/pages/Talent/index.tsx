import ConfirmButton from '@/components/ConfirmButton';
import ProTable from '@/components/ProTable';
import UploadBtn from '@/components/UploadBtn';
import { initialModalState } from '@/constants';
import { StatusType, StatusTypeDesc } from '@/constants/enum';
import { importTalent, patchTalent, queryTalentList } from '@/services/talent';
import { downLoad, queryDictEnum } from '@/utils/utils';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useCallback, useMemo, useReducer, useRef } from 'react';
import EditModal from './EditModal';

const TalentPage = () => {
  const [modalState, setModalState] = useReducer(
    (s: ModalState<TalentData>, n: Partial<ModalState<TalentData>>) => ({
      ...s,
      ...n,
    }),
    initialModalState,
  );
  const actionRef = useRef<ActionType>();

  const reloadTable = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  const handlePatchTalent = useCallback(
    async (params: PatchParamsDTO) => {
      await patchTalent(params);
      reloadTable();
      message.success(`${StatusTypeDesc[params.type]}成功！`);
    },
    [reloadTable],
  );

  const columns = useMemo<ProColumns<TalentData, 'text'>[]>(
    () => [
      {
        title: '序号',
        dataIndex: 'talentNo',
        hideInSearch: true,
        render: (_, _record, index) => index + 1,
      },
      {
        title: '天赋ID',
        dataIndex: 'id',
        hideInSearch: true,
      },
      {
        title: '天赋标题',
        dataIndex: 'talentTitle',
      },
      {
        title: '天赋描述',
        dataIndex: 'talentDesc',
        hideInSearch: true,
      },
      {
        title: '适用种族',
        dataIndex: 'raceCode',
        valueType: 'select',
        request: async () => await queryDictEnum('race'),
      },
      {
        title: '天赋等级',
        dataIndex: 'talentLevelCode',
        valueType: 'select',
        request: async () => await queryDictEnum('talentLevel'),
      },
      {
        title: '天赋效果',
        dataIndex: 'talentEffectName',
        hideInSearch: true,
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
        render: (_, record: TalentData) => [
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
                  handlePatchTalent({ type: StatusType.ONLINE, id: record.id })
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
                handlePatchTalent({ type: StatusType.OFFLINE, id: record.id })
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
                handlePatchTalent({ type: StatusType.DELETED, id: record.id })
              }
            />
          ),
        ],
      },
    ],
    [handlePatchTalent],
  );

  return (
    <PageContainer title="天赋管理">
      <ProTable<TalentData, TalentQueryParams>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalState({ visible: true })}
          >
            新增天赋
          </Button>,
          <UploadBtn
            key="import"
            importService={importTalent}
            importCallback={reloadTable}
          >
            导入天赋
          </UploadBtn>,
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={() =>
              downLoad(
                require('@/assets/files/talent.xlsx'),
                '天赋模板.xlsx',
              )
            }
          >
            下载模板
          </Button>,
        ]}
        querylistReq={queryTalentList}
        columns={columns}
      />
      <EditModal
        {...modalState}
        reloadTable={reloadTable}
        onOpenChange={(visible) =>
          setModalState({ visible, ...(!visible ? { detailData: null } : {}) })
        }
      />
    </PageContainer>
  );
};

export default TalentPage;
