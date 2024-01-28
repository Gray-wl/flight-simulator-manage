import EditDataFormList from '@/components/EditDataFormList';
import { addTalent, modifyTalent } from '@/services/talent';
import { queryDictEnum } from '@/utils/utils';
import {
  ModalForm,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

interface IProps extends ModalState<TalentData> {
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
    async (values: CreateTalentDto) => {
      try {
        setLoading(true);
        const { id } = detailData || {};
        if (id) {
          await modifyTalent(id, values);
        } else {
          await addTalent(values);
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
      title={detailData ? '编辑天赋' : '新增天赋'}
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
          name="talentTitle"
          label="天赋标题"
          rules={[{ required: true, message: '请输入天赋标题' }]}
          fieldProps={{ maxLength: 10 }}
        />
        <ProFormSelect
          width="sm"
          name="talentLevelCode"
          label="天赋等级"
          rules={[{ required: true, message: '请选择天赋等级' }]}
          request={async () => await queryDictEnum('talentLevel')}
        />
        <ProFormSelect
          width="sm"
          name="raceCode"
          label="适用种族"
          request={async () => await queryDictEnum('race')}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="lg"
          name="talentDesc"
          label="天赋描述"
          fieldProps={{ maxLength: 100, showCount: true }}
        />
      </ProForm.Group>
      <EditDataFormList
        label="触发条件"
        name="talentTriggerList"
        addBtnText="添加条件"
        initialValue={[{}]}
      />
      <EditDataFormList
        label="属性效果"
        name="talentEffectList"
        addBtnText="添加效果"
        initialValue={[{}]}
      />
    </ModalForm>
  );
};

export default EditModal;
