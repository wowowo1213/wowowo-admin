import Layout from '@/layout/index.vue';
import router from '@/router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const dynamicRoutes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { id: '1', name: '控制台', requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Layout,
    meta: { id: '2', name: '权限管理', requiresAuth: true },
    children: [
      {
        path: 'normolUser',
        name: 'NormolUser',
        component: () => import('@/views/text/NormalUser.vue'),
        meta: { id: '2-1', name: 'NormalUser', requiresAuth: true, roles: ['editor', 'admin'] },
      },
      {
        path: 'adminUser',
        name: 'AdminUser',
        component: () => import('@/views/text/AdminUser.vue'),
        meta: { id: '2-2', name: 'AdminUser', requiresAuth: true, roles: ['admin'] },
      },
      {
        path: 'adminUser2',
        name: 'AdminUser2',
        component: () => import('@/views/text/AdminUser.vue'),
        meta: { id: '2-3', name: 'AdminUser2', requiresAuth: true, roles: ['admin'] },
      },
    ],
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/table/index.vue'),
    meta: { id: '3', name: 'Table', requiresAuth: true },
  },
];

export const loadRoute = async () => {
  dynamicRoutes.forEach((route) => {
    if (router.hasRoute(route.name)) {
      router.removeRoute(route.name);
    }
  });

  const filterRoutes = (routes) => {
    return routes.filter((route) => {
      if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(userStore.role);
      }

      if (route.children && route.children.length > 0) {
        route.children = filterRoutes(route.children);
        return route.children.length > 0;
      }

      return true;
    });
  };

  const accessibleRoutes = filterRoutes(dynamicRoutes);

  accessibleRoutes.forEach((route) => {
    router.addRoute(route);
  });
};
