import Mock from 'mockjs';
import { getToken } from '@/utils/auth';

const tokens = {
  'wowowo-admin': { token: 'admin-token' },
  'wowowo-1213': { token: 'editor-token' },
};

const users = {
  'admin-token': {
    roles: 'admin',
    introduction: '这是一个超级管理员',
    avatar: '../public/二次元头像.jpg',
    name: 'wowowo-admin',
  },
  'editor-token': {
    roles: 'editor',
    introduction: '这是一个普通管理员',
    avatar: '../public/曼波.jpg',
    name: 'wowowo-1213',
  }
};

export const userMocks = [
  Mock.mock('/api/wowowo-admin/user/login', 'post', (options) => {
    const { username } = JSON.parse(options.body);
    const tokenData = tokens[username as 'wowowo-admin' | 'wowowo-1213'];
    if (!tokenData) {
      return {
        code: 6666,
        message: '账号或密码不正确捏~(￣▽￣)~*'
      };
    }
    return {
      code: 7000,
      data: tokenData,
    };
  }),

  Mock.mock(/\/api\/wowowo-admin\/user\/info/, 'get', (options) => {
    const token = getToken();
    const info = users[token as 'admin-token' | 'editor-token'];

    if (!info) {
      return {
        code: 401,
        message: '登录失效，无法获取用户信息🤣🤣.'
      };
    }

    return {
      code: 4000,
      data: info
    };
  }),

  Mock.mock('/api/wowowo-admin/user/logout', 'post', () => ({
    code: 20000,
    data: 'success'
  })),
];