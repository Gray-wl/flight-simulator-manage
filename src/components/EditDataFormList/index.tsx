import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Select, Space } from 'antd';
import { FC } from 'react';
import styles from './index.less';
import { columns as defaultColumns } from './utils';

interface IProps {
  name: string | string[] | [number, string];
  label: string;
  columns?: EditDataFormListColumns[];
  addBtnText: string;
  initialValue?: any[];
}

const EditDataFormList: FC<IProps> = ({
  name,
  label,
  columns,
  addBtnText,
  initialValue,
}) => {
  return (
    <Form.List name={name} initialValue={initialValue}>
      {(fields, { add, remove }) => (
        <Form.Item label={label} className={styles['edit-data-form-item']}>
          {fields.map((field, index) => (
            <Space key={field.key} className="w-[100%]" align="baseline">
              {(columns || defaultColumns).map(
                ({
                  name: cName,
                  label: cLabel,
                  type,
                  required,
                  show,
                  ...otherData
                }) => {
                  if (typeof show === 'function' && !show({ index }))
                    return null;
                  let msgData = '请输入';
                  if (type === 'Select') msgData = '请选择';
                  msgData = msgData + cLabel;
                  return (
                    <Form.Item
                      {...field}
                      key={cName}
                      name={[field.name, cName]}
                      rules={[{ required, message: msgData }]}
                    >
                      {type === 'Select' && (
                        <Select placeholder={msgData} {...otherData} />
                      )}
                      {type === 'InputNumber' && (
                        <InputNumber
                          className="w-[100%]"
                          placeholder={msgData}
                        />
                      )}
                    </Form.Item>
                  );
                },
              )}
              {fields.length > 1 && (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              )}
              {index + 1 === fields.length && (
                <Button type="link" onClick={add} icon={<PlusOutlined />}>
                  {addBtnText}
                </Button>
              )}
            </Space>
          ))}
        </Form.Item>
      )}
    </Form.List>
  );
};

export default EditDataFormList;
