<template>
  <div class="dashboard-container">
    <h1 class="mb-4">Dashboard</h1>
    
    <div class="row">
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon">🏪</div>
          <div class="stat-info">
            <h3>Total Comercios</h3>
            <p class="stat-number">{{ stats.total }}</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon">🛵</div>
          <div class="stat-info">
            <h3>Con Delivery</h3>
            <p class="stat-number">{{ stats.conDelivery }}</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4 mb-3">
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <h3>Destacados</h3>
            <p class="stat-number">{{ stats.destacados }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="action-buttons">
          <router-link to="/admin/comercios" class="btn btn-primary">
            📋 Ver Comercios
          </router-link>
          <router-link to="/admin/comercios/nuevo" class="btn btn-success">
            ➕ Nuevo Comercio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stats = ref({
  total: 0,
  conDelivery: 0,
  destacados: 0
});

const cargarStats = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/comercios');
    const comercios = response.data;
    stats.value.total = comercios.length;
    stats.value.conDelivery = comercios.filter(c => c.delivery).length;
    stats.value.destacados = comercios.filter(c => c.destacado).length;
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(() => {
  cargarStats();
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 48px;
}

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #176E43;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-primary {
  background-color: #176E43;
  border: none;
  padding: 12px 24px;
}

.btn-primary:hover {
  background-color: #0f5a38;
}

.btn-success {
  background-color: #28a745;
  border: none;
  padding: 12px 24px;
}
</style>