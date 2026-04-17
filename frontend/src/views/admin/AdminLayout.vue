<template>
  <div class="admin-layout">
    <SidebarAdmin />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from '@/components/admin/SidebarAdmin.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-content {
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
}
</style>