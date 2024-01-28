import EditDataFormList from '@/components/EditDataFormList';
import useTalentListEnum from '@/hooks/useTalentListEnum';
import { addScenario, modifyScenario } from '@/services/scenario';
import { queryDictEnum } from '@/utils/utils';
import {
  DrawerForm,
  ProForm,
  ProFormDigitRange,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import ChapterFormList from './ChapterFormList';

interface IProps extends ModalState<ScenarioData> {
  reloadTable: () => void;
  onOpenChange: (visible: boolean) => void;
}

const EditDrawer: FC<IProps> = ({
  detailData,
  visible,
  reloadTable,
  onOpenChange,
}) => {
  const { talentListEnum } = useTalentListEnum();
  const formRef = useRef<ProFormInstance>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (detailData) {
      const { talents, minAge, maxAge, ...extraDetailData } = detailData;
      formRef.current?.setFieldsValue({
        ...extraDetailData,
        _triggerAge: [minAge, maxAge],
        _talentIds: talents?.map(({ id }) => id),
      });
    } else {
      formRef.current?.resetFields();
    }
  }, [detailData]);

  const onFinish = useCallback(
    async (
      values: Omit<CreateScenarioDto, 'minAge' | 'maxAge'> & {
        _triggerAge?: number[];
      },
    ) => {
      try {
        setLoading(true);
        const { _triggerAge, ...extraValues } = values;
        const [minAge, maxAge] = _triggerAge || [];
        const data = { ...extraValues, minAge, maxAge };
        const { id } = detailData || {};
        if (id) {
          await modifyScenario(id, data);
        } else {
          await addScenario(data);
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
    <DrawerForm
      title={detailData ? '编辑剧情' : '新增剧情'}
      open={visible}
      formRef={formRef}
      loading={loading}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      layout="horizontal"
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="storyTitle"
          label="剧情标题"
          rules={[{ required: true, message: '请输入剧情标题' }]}
          fieldProps={{ maxLength: 20 }}
        />
        <ProFormSelect
          width="sm"
          name="storyTypeCode"
          label="剧情类型"
          rules={[{ required: true, message: '请选择剧情类型' }]}
          request={async () => await queryDictEnum('storyType')}
        />
        <ProFormSelect width="sm" name="raceCode" label="适用种族" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigitRange
          width="sm"
          name="_triggerAge"
          label="适用年龄"
          separator="~"
          placeholder={['最小值', '最大值']}
        />
        <ProFormSelect
          width="lg"
          name="_talentIds"
          label="天赋条件"
          options={talentListEnum}
          fieldProps={{
            mode: 'multiple',
            fieldNames: { label: 'talentTitle', value: 'id' },
          }}
        />
      </ProForm.Group>
      <EditDataFormList
        label="属性条件"
        name="attributeList"
        addBtnText="添加条件"
        initialValue={[{}]}
      />
      <ChapterFormList />
    </DrawerForm>
  );
};

export default EditDrawer;
