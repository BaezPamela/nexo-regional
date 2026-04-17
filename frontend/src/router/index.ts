import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComerciosView from '../views/ComerciosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/comercio/:id',
      name: 'detalle',
      component: () => import('../views/DetalleComercio.vue')
    },
    {
          path: '/comercios',
          name: 'comercios',
          component: ComerciosView
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('../views/admin/AdminLogin.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'adminDashboard',
          component: () => import('../views/admin/AdminDashboard.vue')
        },
        {
          path: 'comercios',
          name: 'adminComercios',
          component: () => import('../views/admin/AdminComercios.vue')
        },
        {
          path: 'comercios/nuevo',
          name: 'adminComercioNuevo',
          component: () => import('../views/admin/AdminComercioForm.vue')
        },
        {
          path: 'comercios/editar/:id',
          name: 'adminComercioEditar',
          component: () => import('../views/admin/AdminComercioForm.vue')
        }
        
      ]
    }
  ]
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('admin_token')
  
  if (requiresAuth && !isAuthenticated) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router