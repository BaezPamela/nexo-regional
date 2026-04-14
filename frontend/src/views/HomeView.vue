<template>
  <div class="container py-5">
    <header class="text-center mb-5">
      <h1 class="fw-bold text-success">Nexo Regional</h1>
      <p class="lead text-muted">Descubrí los mejores comercios de Casilda</p>
    </header>

    <div class="row g-4" v-if="comercios.length > 0">
      <div class="col-12 col-md-6 col-lg-3" v-for="c in comercios" :key="c.id_comercio">
        <ComercioCard :comercio="c" />
      </div>
    </div>
    
    <div v-else class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
      <p class="mt-2">Cargando comercios...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ComercioCard from '../components/ComercioCard.vue';

// Aquí guardaremos la lista que viene del backend
const comercios = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/comercios');
    comercios.value = response.data;
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
  }
});
</script>