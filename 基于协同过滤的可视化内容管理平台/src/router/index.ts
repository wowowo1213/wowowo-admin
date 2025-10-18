import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import Login from '@/views/login/index.vue';
import { useUserStore } from '@/stores/user';
import { getToken } from '@/utils/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },

    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'Dashboard',
          meta: { title: 'Dashboard', requiresAuth: true }
        },
      ]
    },

    {
      path: '/example',
      component: Layout,
      meta: { title: 'Table', requiresAuth: true },
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import('@/views/table/index.vue'),
          meta: { title: 'Table', requiresAuth: true }
        },
        {
          path: 'normolUser',
          name: 'NormolUser',
          component: () => import('@/views/text/NormalUser.vue'),
          meta: { title: 'NormalUser', requiresAuth: true }
        },
        {
          path: 'adminUser',
          name: 'AdminUser',
          component: () => import('@/views/text/AdminUser.vue'),
          meta: { title: 'AdminUser', requiresAuth: true }
        },
      ]
    },

    {
      path: '/404',
      component: () => import('@/views/404.vue'),
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const hasToken = getToken();

  if (to.matched.length === 0) {
    return next('/404');
  }

  if (hasToken) {
    // 这边主要是根据token来刷新本地用户信息
    if (to.path === '/login') {
      next({ path: '/' });
    } else if (to.path === '/example/adminUser') {
      if (userStore.roles[0] === 'admin') {
        next();
      } else {
        alert('您没有权限访问该页面');
        next(false);
      }
    } else {
      if (userStore.hasUserInfo) {
        next();
      } else {
        try {
          if (userStore.loadingUserInfo) {
            // 这个设置可以避免重复请求用户信息，因为loading为真值，说明正在请求中
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
    }
  } else {
    if (to.meta.requiresAuth === false) {
      // 没有token，但如果不需要认证，直接放行
      next();
    } else {
      // 没有token，但需要认证，则跳转到登录页面，并记录当前路径
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;