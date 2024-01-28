import ConfirmButton from '@/components/ConfirmButton';
import ProTable from '@/components/ProTable';
import UploadBtn from '@/components/UploadBtn';
import { initialModalState } from '@/constants';
import {
  deleteDictionary,
  importDictionary,
  queryDictionaryList,
} from '@/services/dictionary';
import { downLoad } from '@/utils/utils';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProColumns,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useCallback, useMemo, useReducer, useRef } from 'react';
import EditModal from './EditModal';

const DictionaryPage = () => {
  const [modalState, setModalState] = useReducer(
    (
      s: ModalState<DictionaryData>,
      n: Partial<ModalState<DictionaryData>>,
    ) => ({
      ...s,
      ...n,
    }),
    initialModalState,
  );
  const actionRef = useRef<ActionType>();

  const reloadTable = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  const handleDeleteDictionary = useCallback(
    async (params: DeleteDictionaryParams) => {
      await deleteDictionary(params);
      reloadTable();
      message.success('删除成功！');
    },
    [reloadTable],
  );

  const columns = useMemo<ProColumns<DictionaryData, 'text'>[]>(
    () => [
      {
        title: '字典名称',
        dataIndex: 'dictName',
      },
      {
        title: '字典类型',
        dataIndex: 'dictType',
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        fixed: 'right',
        render: (_, record: DictionaryData) => [
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
          <ConfirmButton
            key="delete"
            size="small"
            onConfirm={() =>
              handleDeleteDictionary({
                id: record.id,
              })
            }
          />,
        ],
      },
    ],
    [handleDeleteDictionary],
  );

  return (
    <PageContainer title="字典管理">
      <ProTable<DictionaryData, DictionaryQueryParams>
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalState({ visible: true })}
          >
            新增字典
          </Button>,
          <UploadBtn
            key="import"
            importService={importDictionary}
            importCallback={reloadTable}
          >
            导入字典
          </UploadBtn>,
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={() =>
              downLoad(
                require('@/assets/files/dictionary.xlsx'),
                '字典模板.xlsx',
              )
            }
          >
            下载模板
          </Button>,
        ]}
        querylistReq={queryDictionaryList}
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

export default DictionaryPage;
