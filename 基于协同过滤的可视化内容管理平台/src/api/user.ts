import service from '@/utils/request';

interface UserInfo {
  username: string;
  password: string;
}

export function apiLogin(data: UserInfo) {
  return service({
    url: '/wowowo-admin/user/login',
    method: 'post',
    data: data,
  })
}

export function apiGetInfo(token: string) {
  return service({
    url: '/wowowo-admin/user/info',
    method: 'get',
    params: { token },
  })
}

export function apiLogout() {
  return service({
    url: '/wowowo-admin/user/logout',
    method: 'post',
  })
}