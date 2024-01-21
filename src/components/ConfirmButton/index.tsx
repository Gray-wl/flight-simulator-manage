import { Button, ButtonProps, Popconfirm } from 'antd';
import { FC, ReactNode } from 'react';

interface ConfirmButtonProps extends ButtonProps {
  onConfirm: () => void | Promise<void>;
  children?: ReactNode;
}

const ConfirmButton: FC<ConfirmButtonProps> = ({
  onConfirm,
  children = '删除',
  ...props
}) => (
  <Popconfirm
    title={`是否确认${children}？`}
    onConfirm={onConfirm}
    okText="确定"
    cancelText="取消"
  >
    <Button type="link" danger {...props}>
      {children}
    </Button>
  </Popconfirm>
);

export default ConfirmButton;
