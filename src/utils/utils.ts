import { StatusType } from '@/constants/enum';
import { queryDictionaryEnum } from '@/services/dictionary';
import routes from '../../config/routes';

/**
 * 查询字典枚举
 * @param dictType 字典类型
 */
export const queryDictEnum = async (dictType: string) => {
  const res = await queryDictionaryEnum({ dictType }, StatusType.ONLINE);
  return res.data?.map(({ dictName, id }: DictionaryData) => ({
    label: dictName,
    value: id,
  }));
};

/**
 * @description 下载文件
 * @param downLoadUrl 文件地址
 * @param fileName 文件名
 */
export const downLoad = (downLoadUrl: string, fileName?: string) => {
  const aEle = document.createElement('a');
  if (fileName) {
    aEle.download = fileName;
  }
  aEle.href = downLoadUrl;
  aEle.click();
};

/**
 * @description 是否是layout页面
 */
export const layoutPage = () => {
  const currentRoute = window.location.pathname;
  const routeConfig = routes.find((route) => route.path === currentRoute);
  return routeConfig && routeConfig.layout !== false;
};
