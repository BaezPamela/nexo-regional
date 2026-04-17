<template>
  <div class="comercio-card">
    <router-link :to="'/comercio/' + comercio.id_comercio" class="text-decoration-none">
      <div class="card h-100 shadow-sm hover-effect">
        <div class="position-relative">
          <img 
            :src="'http://localhost:3000/img/' + (comercio.imagen_url || 'default.jpg')" 
            class="card-img-top"
            :alt="comercio.nombre"
          >
          <div class="logo-overlay" v-if="comercio.logo_url">
            <img :src="'http://localhost:3000/img/' + comercio.logo_url" :alt="comercio.nombre">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ comercio.nombre }}</h5>
          <p class="card-text text-muted small">{{ comercio.descripcion?.slice(0, 80) }}...</p>
          <div class="d-flex justify-content-center gap-2 mt-2">
            <span v-if="comercio.delivery" class="badge bg-success">Delivery</span>
            <span v-if="comercio.destacado" class="badge bg-warning text-dark">Destacado</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  comercio: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.comercio-card {
  cursor: pointer;
}

.hover-effect {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.logo-overlay {
  position: absolute;
  bottom: -20px;
  left: 15px;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.logo-overlay img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.card-title {
  margin-top: 15px;
  color: #176E43;
  font-weight: 700;
}
</style>