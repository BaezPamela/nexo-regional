<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">Todos los Comercios</h1>
    
    <!-- Filtros -->
    <div class="filtros-container mb-4">
      <div class="row">
        <div class="col-md-6 mb-2">
          <input 
            type="text" 
            v-model="filtroBusqueda" 
            class="form-control" 
            placeholder="Buscar comercio..."
          >
        </div>
        <div class="col-md-6 mb-2">
          <select v-model="filtroCategoria" class="form-control">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">
              {{ cat.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="comerciosFiltrados.length === 0" class="text-center py-5">
      <p class="text-muted">No se encontraron comercios</p>
    </div>

    <div v-else class="row">
      <div class="col-md-4 col-lg-3 mb-4" v-for="comercio in comerciosFiltrados" :key="comercio.id_comercio">
        <ComercioCard :comercio="comercio" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ComercioCard from '../components/admin/ComercioCard.vue';

const route = useRoute();
const todosComercios = ref([]);
const categorias = ref([]);
const cargando = ref(false);
const filtroBusqueda = ref('');
const filtroCategoria = ref('');

// Filtrar comercios según búsqueda y categoría
const comerciosFiltrados = computed(() => {
  let resultado = todosComercios.value;
  
  if (filtroBusqueda.value) {
    const busqueda = filtroBusqueda.value.toLowerCase();
    resultado = resultado.filter(c => 
      c.nombre.toLowerCase().includes(busqueda) ||
      c.descripcion?.toLowerCase().includes(busqueda) ||
      c.subcategoria?.toLowerCase().includes(busqueda)
    );
  }
  
  if (filtroCategoria.value) {
    resultado = resultado.filter(c => c.id_categoria == filtroCategoria.value);
  }
  
  return resultado;
});

// Cargar categorías
const cargarCategorias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias');
    categorias.value = response.data;
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

// Cargar comercios
const cargarComercios = async () => {
  cargando.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/comercios');
    todosComercios.value = response.data;
    
    // Si hay parámetros en la URL, aplicarlos
    if (route.query.busqueda) {
      filtroBusqueda.value = route.query.busqueda;
    }
    if (route.query.categoria) {
      filtroCategoria.value = route.query.categoria;
    }
  } catch (error) {
    console.error('Error al cargar comercios:', error);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarCategorias();
  cargarComercios();
});
</script>

<style scoped>
.filtros-container {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.form-control {
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 10px 15px;
}

.form-control:focus {
  border-color: #176E43;
  box-shadow: 0 0 0 0.2rem rgba(23, 110, 67, 0.25);
}
</style>