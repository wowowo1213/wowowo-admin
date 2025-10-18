import Cookies from 'js-cookie';

const TokenKey = 'wowowo-1213-admin';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  // cookies的有效时间这边设置为1小时
  return Cookies.set(TokenKey, token, { expires: 1 / 24 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
