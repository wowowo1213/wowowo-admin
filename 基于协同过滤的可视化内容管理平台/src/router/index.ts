import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import Login from '@/views/login/index.vue';
import { useUserStore } from '@/stores/user';
import { getToken } from '@/utils/auth';

// 这边是静态路由
// meta中的requiresAuth用来判断是否需要登陆才能访问
const constantRoutes = [
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
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', requiresAuth: true },
      },
    ]
  },
  {
    path: '/example',
    name: 'Example',
    component: Layout,
    meta: { title: 'Table', requiresAuth: true },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'Table', requiresAuth: true }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: { requiresAuth: false }
  }
];

// 动态路由
const dynamicRoutes = [
  {
    path: '/example',
    name: 'Example',
    component: Layout,
    meta: { title: 'Table', requiresAuth: true },
    children: [
      {
        path: 'normolUser',
        name: 'NormolUser',
        component: () => import('@/views/text/NormalUser.vue'),
        meta: { title: 'NormalUser', requiresAuth: true, roles: 'editor' }
      },
      {
        path: 'adminUser',
        name: 'AdminUser',
        component: () => import('@/views/text/AdminUser.vue'),
        meta: { title: 'AdminUser', requiresAuth: true, roles: 'admin' }
      },
      {
        path: 'adminUser2',
        name: 'AdminUser2',
        component: () => import('@/views/text/AdminUser.vue'),
        meta: { title: 'AdminUser2', requiresAuth: true, roles: 'admin' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

async function loadRoutes(role: string) {
  dynamicRoutes.forEach(route => {
    if (router.hasRoute(route.name)) {
      router.removeRoute(route.name);
    }
  });

  const filterRoutes = (routes: RouteRecordRaw[]) => {
    return routes.filter(route => {
      if (route.children && route.children.length > 0) {
        route.children = filterRoutes(route.children);
      }

      const hasPermission = !route.meta?.role ||
        (Array.isArray(route.meta.role) &&
          route.meta.role.includes(role));

      return hasPermission || (route.children && route.children.length > 0);
    });
  };

  const filteredRoutes = filterRoutes(dynamicRoutes);

  filteredRoutes.forEach(route => {
    router.addRoute(route);
  });
}

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