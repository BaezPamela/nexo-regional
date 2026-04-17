<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo-nexo.png" alt="Logo" class="logo-login">
      <h2>Panel de Administración</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <input 
            type="text" 
            v-model="username" 
            class="form-control" 
            placeholder="Usuario"
            required
          >
        </div>
        <div class="mb-3">
          <input 
            type="password" 
            v-model="password" 
            class="form-control" 
            placeholder="Contraseña"
            required
          >
        </div>
        <button type="submit" :disabled="cargando" class="btn btn-success w-100">
          {{ cargando ? 'Verificando...' : 'Ingresar' }}
        </button>
      </form>
      
      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
      
      <!-- Información de prueba -->
      <div class="mt-4 p-3 bg-light rounded">
        <p class="mb-1 small fw-bold">Cuentas de prueba:</p>
        <p class="mb-0 small">Usuario: <strong>admin</strong> | Contraseña: <strong>admin123</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const username = ref('');
const password = ref('');
const cargando = ref(false);
const error = ref('');

const handleLogin = async () => {
  cargando.value = true;
  error.value = '';
  
  try {
    const response = await axios.post('http://localhost:3000/api/admin/login', {
      username: username.value,
      password: password.value
    });
    
    if (response.data.token) {
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.usuario));
      router.push('/admin/dashboard');
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al conectar con el servidor';
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: white;
}

.login-card{
  background: rgba(255, 255, 255, 0.15); 
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); /* Soporte para Safari */
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px;
  border-radius: 20px;
  
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo-login {
  width: 100px;
  margin-bottom: 20px;
}

.login-card h2 {
  margin-bottom: 30px;
  color: #176E43;
  font-size: 24px;
}

.btn-success {
  background-color: #176E43;
  border: none;
  padding: 12px;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #0f5a38;
}

.btn-success:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.alert-danger {
  font-size: 14px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 8px;
}

.bg-light {
  background-color: #f8f9fa !important;
}
</style>