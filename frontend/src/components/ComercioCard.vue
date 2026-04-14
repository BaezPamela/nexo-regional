<template>
  <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
    <img :src="'http://localhost:3000/img/' + comercio.imagen_url" class="card-img-top" :alt="comercio.nombre" style="height: 180px; object-fit: cover;">
    
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold">{{ comercio.nombre }}</h5>
      <p class="card-text text-muted small flex-grow-1">
        {{ comercio.descripcion.substring(0, 80) }}...
      </p>
      
      <router-link :to="'/comercio/' + comercio.id_comercio" class="btn btn-success w-100 rounded-pill mt-2">
        Ver más
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps(['comercio']); // Recibe los datos del comercio desde el padre
</script>