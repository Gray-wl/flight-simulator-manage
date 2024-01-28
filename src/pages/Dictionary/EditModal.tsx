import { addDictionary, modifyDictionary } from '@/services/dictionary';
import {
  ModalForm,
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

interface IProps extends ModalState<DictionaryData> {
  reloadTable: () => void;
  onOpenChange: (visible: boolean) => void;
}

const EditModal: FC<IProps> = ({
  detailData,
  visible,
  reloadTable,
  onOpenChange,
}) => {
  const formRef = useRef<ProFormInstance>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (detailData) {
      formRef.current?.setFieldsValue(detailData);
    } else {
      formRef.current?.resetFields();
    }
  }, [detailData]);

  const onFinish = useCallback(
    async (values: CreateDictionaryDto) => {
      try {
        setLoading(true);
        const { id } = detailData || {};
        if (id) {
          await modifyDictionary(id, values);
        } else {
          await addDictionary(values);
        }
        message.success(id ? '编辑成功！' : '新增成功！');
        onOpenChange(false);
        reloadTable();
      } finally {
        setLoading(false);
      }
    },
    [onOpenChange, reloadTable, detailData],
  );

  return (
    <ModalForm
      title={detailData ? '编辑字典' : '新增字典'}
      open={visible}
      formRef={formRef}
      loading={loading}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      autoFocusFirstInput
      layout="horizontal"
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="dictName"
          label="字典名称"
          rules={[{ required: true, message: '请输入字典名称' }]}
          fieldProps={{ maxLength: 20 }}
        />
        <ProFormText
          width="sm"
          name="dictType"
          label="字典类型"
          rules={[{ required: true, message: '请输入字典类型' }]}
          fieldProps={{ maxLength: 10 }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default EditModal;
