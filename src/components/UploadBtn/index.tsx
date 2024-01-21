import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { FC, useCallback, useState } from 'react';

interface IProps {
  importService: (file: FormData) => Promise<void>;
  importCallback?: () => void;
  children?: React.ReactNode;
}

const UploadBtn: FC<IProps> = ({ importCallback, importService, children }) => {
  const [isUploadIng, setIsUploadIng] = useState(false);

  const handleImport = useCallback(
    async (file: RcFile) => {
      console.log(33333)
      const formData = new FormData();
      formData.append('file', file);
      try {
        setIsUploadIng(true);
        await importService(formData);
        importCallback?.();
        message.success('导入成功！');
      } finally {
        setIsUploadIng(false);
      }
      return '';
    },
    [importCallback, importService],
  );

  return (
    <Upload
      action={handleImport}
      maxCount={1}
      showUploadList={false}
      disabled={isUploadIng}
      accept=".xlsx, .xls"
    >
      <Button
        type="primary"
        ghost
        loading={isUploadIng}
        icon={<UploadOutlined />}
      >
        {children}
      </Button>
    </Upload>
  );
};

export default UploadBtn;
