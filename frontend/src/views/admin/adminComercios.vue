<template>
  <div class="comercios-container">
    <div class="header-actions">
      <h1>Gestión de Comercios</h1>
      <button @click="irANuevo" class="btn btn-success">
        + Nuevo Comercio
      </button>
    </div>

    <!-- Mostrar loading mientras carga -->
    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Mostrar mensaje si no hay comercios -->
    <div v-else-if="comercios.length === 0" class="alert alert-info text-center mt-4">
      No hay comercios cargados. ¡Creá el primero!
    </div>

    <!-- Tabla de comercios -->
    <div v-else class="table-responsive mt-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Delivery</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comercio in comercios" :key="comercio.id_comercio">
            <td>{{ comercio.id_comercio }}</td>
            <td>
              <img 
                :src="'http://localhost:3000/img/' + (comercio.logo_url || 'default-logo.png')" 
                class="table-logo"
                @error="handleImageError"
              >
            </td>
            <td class="fw-bold">{{ comercio.nombre }}</td>
            <td>{{ comercio.categoria_nombre || 'Sin categoría' }}</td>
            <td>
              <span :class="comercio.delivery ? 'badge bg-success' : 'badge bg-secondary'">
                {{ comercio.delivery ? 'Sí' : 'No' }}
              </span>
            </td>
            <td>
              <button @click="toggleDestacado(comercio)" class="btn btn-sm" :class="comercio.destacado ? 'btn-warning' : 'btn-outline-secondary'">
                {{ comercio.destacado ? '★ Destacado' : '☆ Marcar' }}
              </button>
            </td>
            <td>
              <button @click="editarComercio(comercio.id_comercio)" class="btn btn-sm btn-primary me-2">
                ✏️ Editar
              </button>
              <button @click="eliminarComercio(comercio)" class="btn btn-sm btn-danger">
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
       </table>
    </div>
  </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const comercios = ref([]);
const cargando = ref(false);

const cargarComercios = async () => {
  cargando.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/comercios');
    console.log('Comercios cargados:', response.data);
    comercios.value = response.data;
  } catch (error) {
    console.error('Error al cargar comercios:', error);
    alert('Error al cargar los comercios');
  } finally {
    cargando.value = false;
  }
};

const irANuevo = () => {
  console.log('Navegando a nuevo comercio');
  router.push('/admin/comercios/nuevo');
};

const editarComercio = (id) => {
  console.log('Editando comercio ID:', id);
  router.push(`/admin/comercios/editar/${id}`);
};

const eliminarComercio = async (comercio) => {
  if (confirm(`¿Eliminar "${comercio.nombre}"?`)) {
    try {
      await axios.delete(`http://localhost:3000/api/comercios/${comercio.id_comercio}`);
      alert('Comercio eliminado correctamente');
      cargarComercios();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el comercio');
    }
  }
};

const toggleDestacado = async (comercio) => {
  try {
    await axios.put(`http://localhost:3000/api/comercios/${comercio.id_comercio}`, {
      ...comercio,
      destacado: !comercio.destacado
    });
    cargarComercios();
  } catch (error) {
    console.error('Error al actualizar destacado:', error);
    alert('Error al actualizar');
  }
};

const handleImageError = (event) => {
  event.target.src = '/img/default-logo.png';
};

onMounted(() => {
  cargarComercios();
});
</script>

<style scoped>
.comercios-container {
  padding: 20px;
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

.table-logo {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.btn-sm {
  padding: 5px 12px;
  font-size: 13px;
}

.btn-primary {
  background-color: #176E43;
  border: none;
}

.btn-primary:hover {
  background-color: #0f5a38;
}

.btn-success {
  background-color: #28a745;
  border: none;
  padding: 10px 20px;
}

.btn-success:hover {
  background-color: #218838;
}

.badge {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
