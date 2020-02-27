import { queryGenerator } from '@/utils/location_helper';
import { APIS } from '@/constant/apis';
import PathToRegexp from 'path-to-regexp';

/***
 * 根据token 返回资源
 *
 */
export const resourceUrl = (token: string) => {
  if (token === "") return "";
  const pattern = PathToRegexp.compile(APIS.RESOURCES.DOWNLOAD);
  return process.env.apiUrl as string +
    pattern({ token: token }) +
    queryGenerator({ download: 0})
};
