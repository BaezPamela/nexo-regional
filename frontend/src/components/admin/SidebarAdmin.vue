<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="/img/logo-nexo.png" alt="Logo" class="sidebar-logo">
      <h4>Admin Panel</h4>
    </div>
    
    <nav class="sidebar-nav">
      <router-link to="/admin/dashboard" class="nav-link">
        📊 Dashboard
      </router-link>
      <router-link to="/admin/comercios" class="nav-link">
        🏪 Comercios
      </router-link>
      <button @click="logout" class="nav-link logout">
        🚪 Salir
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('admin_token');
  router.push('/admin/login');
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #1b643c;
  color: black;
  min-height: 100vh;
  padding: 20px;
}

.sidebar-header {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 20px;
}

.sidebar-logo {
  width: 80px;
  margin-bottom: 15px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  display: block;
  padding: 12px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 16px;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.15);
}

.router-link-active {
  background-color: rgba(255,255,255,0.2);
}

.logout {
  margin-top: 40px;
  color: #9b9292;
}

.logout:hover {
  background-color: rgba(95, 93, 93, 0.2);
}
</style>