import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login/index.vue';
import { useUserStore } from '@/stores/user';
import { getToken } from '@/utils/auth';

const staticRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const hasToken = getToken();

  if (to.matched.length === 0) {
    return next({ name: 'NotFound' });
  }

  if (hasToken) {
    if (userStore.hasUserInfo) {
      next();
    } else {
      try {
        if (userStore.loadingUserInfo) {
          return next(false);
        }
        userStore.loadingUserInfo = true;
        await userStore.getInfo();
        next({ ...to, replace: true });
      } catch (error) {
        console.error('Router中的错误，Auth error:', error);
        await userStore.resetToken();
        next(`/login?redirect=${to.path}`);
      } finally {
        userStore.loadingUserInfo = false;
      }
    }
  } else {
    if (to.meta.requiresAuth === false) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
