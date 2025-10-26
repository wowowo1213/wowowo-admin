import { defineStore } from 'pinia';
import { apiLogin, apiLogout, apiGetInfo } from '@/api/user.ts';
import { getToken, setToken, removeToken } from '@/utils/auth.ts';
import router from '@/router';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  role: string;
  hasUserInfo: boolean;
  loadingUserInfo: boolean;
}

interface UserInfo {
  username: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      token: getToken() || '',
      name: '',
      avatar: '',
      role: '',
      hasUserInfo: false,
      loadingUserInfo: false,
    };
  },

  actions: {
    resetState() {
      this.token = getToken() || '';
      this.name = '';
      this.avatar = '';
      this.role = '';
      this.hasUserInfo = false;
      this.loadingUserInfo = false;
    },

    async login(userInfo: UserInfo) {
      const { username, password } = userInfo;
      try {
        const response = await apiLogin({ username: username.trim(), password: password });
        this.token = response.data.token;
        setToken(response.data.token);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async getInfo() {
      try {
        const res = await apiGetInfo(this.token);
        const { data } = res;
        if (!data) {
          throw new Error('userStore中的getInfo有问题');
        }
        const { name, avatar, role } = data;
        this.name = name;
        this.avatar = avatar;
        this.role = role;
        this.hasUserInfo = true;
        this.loadingUserInfo = false;
        return data;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await apiLogout();
        removeToken();
        router.push('/login');
        this.resetState();
      } catch (error) {
        throw error;
      }
    },

    async resetToken() {
      removeToken();
      this.resetState();
    },
  },

  getters: {},
});
