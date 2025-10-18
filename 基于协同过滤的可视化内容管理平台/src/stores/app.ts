import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAppStore = defineStore('app', {
  state() {
    return {
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : true,
        withoutAnimation: false, // 这个属性用来控制是否隐藏动画，为false时显示动画，为true时隐藏动画
      },
      device: 'desktop'
    }
  },

  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1');
      } else {
        Cookies.set('sidebarStatus', '0');
      }
    },

    closeSideBar(withoutAnimation: boolean) {
      Cookies.set('sidebarStatus', '0');
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },

    toggleDevice(device: string) {
      this.device = device;
    }
  },

  getters: {

  }
});