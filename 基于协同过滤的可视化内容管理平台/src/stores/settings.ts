import { defineStore } from "pinia";

interface SettingsState {
  showSettings: string;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

export const useSettingsStore = defineStore("settings", {
  state() {
    return {
      showSettings: 'wowowo-1213',
      fixedHeader: false,
      sidebarLogo: false,
    }
  },

  actions: {
    changeSetting(key: keyof SettingsState, value: any) {
      (this as any)[key] = value; // 这边因为无法确定动态属性key的类型，所以使用any类型
      // 不能使用this.key = value，这样会直接设置一个新的属性，而不是修改原来的属性
    }
  },

  getters: {

  },
})