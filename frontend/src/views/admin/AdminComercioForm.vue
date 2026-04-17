<template>
  <div class="form-container">
    <div class="header-actions">
      <h1>{{ isEditando ? 'Editar Comercio' : 'Nuevo Comercio' }}</h1>
      <button @click="volver" class="btn btn-secondary">← Volver</button>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <form v-else @submit.prevent="guardar" class="mt-4">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre *</label>
          <input v-model="form.nombre" type="text" class="form-control" required>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Categoría *</label>
          <select v-model="form.id_categoria" class="form-control" required>
            <option value="">Seleccionar categoría</option>
            <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">
              {{ cat.nombre }}
            </option>
          </select>
        </div>

        <div class="col-md-12 mb-3">
          <label class="form-label">Descripción</label>
          <textarea v-model="form.descripcion" class="form-control" rows="3"></textarea>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Subcategoría</label>
          <input v-model="form.subcategoria" class="form-control">
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">WhatsApp</label>
          <input v-model="form.whatsapp" class="form-control" placeholder="Ej: 5493412345678">
        </div>

        <div class="col-md-12 mb-3">
          <label class="form-label">Dirección</label>
          <input v-model="form.direccion_texto" class="form-control">
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Imagen Principal URL</label>
          <input v-model="form.imagen_url" class="form-control" placeholder="ejemplo.jpg">
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">Logo URL</label>
          <input v-model="form.logo_url" class="form-control" placeholder="logo.jpg">
        </div>

        <div class="col-md-12 mb-3">
          <label class="form-label">Google Maps URL</label>
          <input v-model="form.google_maps" class="form-control">
        </div>

        <div class="col-md-6 mb-3">
          <div class="form-check">
            <input v-model="form.delivery" type="checkbox" class="form-check-input" id="delivery">
            <label class="form-check-label" for="delivery">Tiene Delivery</label>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <div class="form-check">
            <input v-model="form.destacado" type="checkbox" class="form-check-input" id="destacado">
            <label class="form-check-label" for="destacado">Destacado</label>
          </div>
        </div>

        <div class="col-md-12 mb-3">
          <label class="form-label">Horarios (formato JSON)</label>
          <textarea v-model="horariosTexto" class="form-control" rows="4"
            placeholder='{"lunes_viernes": "09:00 - 21:00", "sabado": "10:00 - 20:00"}'></textarea>
          <small class="text-muted">Ejemplo: {"lunes_viernes": "09:00 - 21:00", "sabado": "10:00 - 20:00"}</small>
        </div>
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-success" :disabled="guardando">
          {{ guardando ? 'Guardando...' : 'Guardar Comercio' }}
        </button>
        <button type="button" @click="volver" class="btn btn-secondary ms-2">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const isEditando = ref(false);
const cargando = ref(false);
const guardando = ref(false);
const categorias = ref([]);

const form = ref({
  nombre: '',
  descripcion: '',
  id_categoria: '',
  subcategoria: '',
  whatsapp: '',
  google_maps: '',
  direccion_texto: '',
  imagen_url: '',
  logo_url: '',
  delivery: false,
  destacado: false
});

const horariosTexto = ref('');

const cargarCategorias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias');
    categorias.value = response.data;
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

const cargarComercio = async (id) => {
  cargando.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/api/comercios/${id}`);
    const data = response.data;
    form.value = {
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      id_categoria: data.id_categoria || '',
      subcategoria: data.subcategoria || '',
      whatsapp: data.whatsapp || '',
      google_maps: data.google_maps || '',
      direccion_texto: data.direccion_texto || '',
      imagen_url: data.imagen_url || '',
      logo_url: data.logo_url || '',
      delivery: data.delivery || false,
      destacado: data.destacado || false
    };
    
    if (data.horarios_json) {
      horariosTexto.value = JSON.stringify(data.horarios_json, null, 2);
    }
  } catch (error) {
    console.error('Error al cargar comercio:', error);
    alert('Error al cargar el comercio');
  } finally {
    cargando.value = false;
  }
};

const guardar = async () => {
  guardando.value = true;
  try {
    // Procesar horarios si hay texto
    if (horariosTexto.value) {
      try {
        form.value.horarios_json = JSON.parse(horariosTexto.value);
      } catch (e) {
        console.warn('Error al parsear horarios:', e);
      }
    }
    
    let response;
    if (isEditando.value) {
      response = await axios.put(`http://localhost:3000/api/comercios/${route.params.id}`, form.value);
    } else {
      response = await axios.post('http://localhost:3000/api/comercios', form.value);
    }
    
    console.log('Respuesta:', response.data);
    alert(isEditando.value ? 'Comercio actualizado!' : 'Comercio creado!');
    router.push('/admin/comercios');
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Error al guardar: ' + (error.response?.data?.error || error.message));
  } finally {
    guardando.value = false;
  }
};

const volver = () => {
  router.push('/admin/comercios');
};

onMounted(() => {
  cargarCategorias();
  const id = route.params.id;
  if (id) {
    isEditando.value = true;
    cargarComercio(id);
  }
});
</script>

<style scoped>
.form-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions h1 {
  margin: 0;
  color: #176E43;
}

.form-label {
  font-weight: 600;
  margin-bottom: 5px;
}

.btn-success {
  background-color: #176E43;
  border: none;
  padding: 10px 30px;
}

.btn-success:hover {
  background-color: #0f5a38;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  padding: 10px 20px;
}
</style>