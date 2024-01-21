import { ResponseStatus } from '@/constants/enum';
import {
  ProTable as AntProTable,
  ParamsType,
  ProTableProps,
  RequestData,
} from '@ant-design/pro-components';
import { useState } from 'react';

const ProTable = <T extends Record<string, any>, P extends ParamsType>({
  querylistReq,
  ...props
}: ProTableProps<T, P> & {
  querylistReq?: (
    params: PaginationParams,
    data: P,
  ) => Promise<Result<PageListDTO<T>>>;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <AntProTable<T, P>
      headerTitle="查询表格"
      options={{
        density: false,
        reload: false,
        setting: false,
      }}
      search={{
        labelWidth: 120,
      }}
      loading={loading}
      request={async (params): Promise<Partial<RequestData<T>>> => {
        if (querylistReq) {
          try {
            setLoading(true);
            const { current, pageSize, ...extraParams } = params;
            const res = await querylistReq(
              { current, pageSize },
              extraParams as P,
            );
            return {
              ...res?.data,
              data: res?.data?.list,
              success: res.status === ResponseStatus.Success,
            };
          } finally {
            setLoading(false);
          }
        }
        return {};
      }}
      {...props}
    />
  );
};

export default ProTable;
