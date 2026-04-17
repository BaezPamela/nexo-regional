<template>
  <div class="container py-4 py-md-5" v-if="comercio">
    <div class="row g-4">
      <!-- Columna Izquierda: Imagen Principal y Nombre -->
      <div class="col-lg-8">
        <div class="tarjeta-principal">
          <div class="contenedor-imagen-principal">
            <img :src="'http://localhost:3000/img/' + comercio.imagen_url" class="imagen-main">
            <div class="contenedor-logo-flotante">
              <img :src="'http://localhost:3000/img/' + (comercio.logo_url || 'default-logo.png')">
            </div>
          </div>
          <div class="cuerpo-tarjeta">
            <h1 class="nombre-grande">{{ comercio.nombre }}</h1>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Información y Horarios -->
      <div class="col-lg-4">
        <div class="tarjeta-info-derecha">
          <div class="info-contenido">
            <h2 class="nombreLocal">{{ comercio.nombre }}</h2>
            <p class="descripcion">{{ comercio.descripcion }}</p>
          </div>

          <div class="ubicacion-contenedor">
            <img src="/img/localizacion.png" alt="localizacion" class="icono-ubicacion">
            <span class="texto-direccion">{{ comercio.direccion || 'Casilda, Santa Fe' }}</span>
          </div>
          
          <div class="etiquetas-contenedor">
            <div v-if="comercio.delivery" class="etiqueta-pill-custom pill-verde">
              <img src="/img/repartidor.png" alt="Delivery" class="icono-custom">
              <span>Delivery</span>
            </div>
            <div class="etiqueta-pill-custom pill-negro">
              <img src="/img/abierto.png" alt="Abierto" class="icono-custom">
              <span>Abierto</span>
            </div>
          </div>

          <a :href="'https://wa.me/' + comercio.whatsapp" 
             target="_blank" 
             class="btn-whatsapp-custom">
            <i class="bi bi-whatsapp"></i>
            <span>Pedir por WhatsApp</span>
          </a>
        </div>

        <div class="tarjeta-horarios">
          <h6 class="nuestros">Nuestros Horarios</h6>
          <p class="hora">
            {{ comercio.horarios_json?.lunes_viernes || '08:00 - 20:00 hs' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Sección Conocenos y Galería -->
    <div class="row mt-5 pt-3 pt-md-5" v-if="comercio.galeria_fotos?.length">
      <div class="col-12">
        <div class="separador-conocenos">
          <div class="linea"></div>
          <span class="texto-conocenos">Conocenos</span>
          <div class="linea"></div>
        </div>
        
        <div class="fila-galeria">
          <div class="contenedor-foto-galeria" v-for="(foto, index) in comercio.galeria_fotos" :key="index">
            <img :src="'http://localhost:3000/img/' + foto" class="img-galeria-fix">
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Mapa, QR y Redes Sociales - 3 COLUMNAS -->
    <div class="row mt-5 pt-3">
      <div class="col-12">
        <div class="seccion-inferior">
          <div class="row g-4">
            <!-- Columna 1: Mapa -->
            <div class="col-lg-4">
              <div class="tarjeta-mapa">
                <h3 class="titulo-seccion">Ubicación</h3>
                <div class="contenedor-mapa">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style="border:0; border-radius: 15px;"
                    loading="lazy"
                    allowfullscreen
                    :src="mapaUrl"
                    referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
                <div class="direccion-mapa">
                  <img src="/img/localizacion.png" alt="ubicacion" class="icono-ubicacion-mapa">
                  <span>{{ comercio.direccion || 'Casilda, Santa Fe' }}</span>
                </div>
              </div>
            </div>

            <!-- Columna 2: Código QR -->
            <div class="col-lg-4">
              <div class="tarjeta-qr">
                <div class="qr-contenido">
                  <div class="qr-imagen-container">
                    <img :src="qrCodeUrl" alt="Código QR" class="qr-imagen">
                  </div>
                  <div class="qr-texto">
                    <h4 class="qr-titulo">Escaneame</h4>
                    <p class="qr-descripcion">Usa la cámara de tu celu y accede a la carta completa</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Columna 3: Redes Sociales -->
            <div class="col-lg-4">
              <div class="tarjeta-redes">
                <h3 class="titulo-seccion text-center">Seguinos en nuestras redes</h3>
                <div class="redes-sociales-container">
                  <a :href="redesSociales.facebook" class="red-social-item facebook" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                    
                  </a>
                  <a :href="redesSociales.instagram" class="red-social-item instagram" target="_blank">
                    <i class="fab fa-instagram"></i>
                    
                  </a>
                  <a :href="redesSociales.whatsapp" class="red-social-item whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                  
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Botón para subir (FUERA del v-if) -->
  <button @click="scrollToTop" class="btn-subir" v-show="showScrollButton">
  <i class="fas fa-arrow-up"></i>
</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'; // ← IMPORTANTE: agregar computed y onUnmounted
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const comercio = ref<any>(null);
const showScrollButton = ref(false);

// URL del mapa (Google Maps) - Usar versión sin API key primero
const mapaUrl = computed(() => {
  const direccion = comercio.value?.direccion || 'Casilda, Santa Fe';
  // Versión que NO necesita API key
  return `https://maps.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;
});

// URL del código QR (generado dinámicamente)
const qrCodeUrl = computed(() => {
  if (!comercio.value) return '';
  const url = window.location.href;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
});

// Redes Sociales (puedes obtenerlas del backend o tenerlas fijas)
const redesSociales = ref({
  facebook: 'https://facebook.com/nexoregional',
  instagram: 'https://instagram.com/nexoregional',
  whatsapp: 'https://wa.me/5493412345678',
  twitter: 'https://twitter.com/nexoregional'
});

// Función para subir al inicio
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Detectar scroll para mostrar/ocultar botón
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300;
};

onMounted(async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`http://localhost:3000/api/comercios/${id}`);
    comercio.value = response.data;
    
    // Si el comercio tiene redes sociales en su objeto, actualizarlas
    if (comercio.value.redes_sociales) {
      redesSociales.value = {
        facebook: comercio.value.redes_sociales.facebook || redesSociales.value.facebook,
        instagram: comercio.value.redes_sociales.instagram || redesSociales.value.instagram,
        whatsapp: comercio.value.redes_sociales.whatsapp || `https://wa.me/${comercio.value.whatsapp}`,
        
      };
    }
    
    window.addEventListener('scroll', handleScroll);
  } catch (error) {
    console.error("Error al cargar el detalle:", error);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ========== ESTILOS BASE ========== */
.container {
  max-width: 1400px;
}

/* ========== TARJETA PRINCIPAL ========== */
.tarjeta-principal {
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background-color: white;
  overflow: hidden;
  width: 100%;
}

.contenedor-imagen-principal {
  width: 100%;
  height: 350px;
  position: relative;
}

.imagen-main {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cuerpo-tarjeta {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 20px 40px 20px;
}

.nombre-grande {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #0c0c0c;
}

.contenedor-logo-flotante {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.contenedor-logo-flotante img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  background-color: white;
  border: 4px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
}

/* ========== TARJETA INFORMACIÓN DERECHA ========== */
.tarjeta-info-derecha {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 25px;
  margin-bottom: 25px;
}

.info-contenido {
  text-align: center;
  margin-bottom: 20px;
}

.nombreLocal {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 15px 0;
  color: #0c0c0c;
}

.descripcion {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* Ubicación */
.ubicacion-contenedor {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.icono-ubicacion {
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
}

.texto-direccion {
  font-size: 15px;
  color: #666;
  line-height: 1.4;
}

/* Etiquetas */
.etiquetas-contenedor {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.etiqueta-pill-custom {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
}

.pill-verde {
  background-color: #F0F7F4;
  color: #147146;
}

.pill-negro {
  background-color: #F0F7F4;
  color: #147146;
}

.icono-custom {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* Botón WhatsApp */
.btn-whatsapp-custom {
  background-color: #147146;
  color: white;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-whatsapp-custom i {
  font-size: 24px;
}

.btn-whatsapp-custom:hover {
  background-color: #0f5a38;
  transform: translateY(-2px);
  color: white;
}

/* Tarjeta Horarios */
.tarjeta-horarios {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 25px;
  text-align: center;
}

.nuestros {
  color: #848484;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 15px 0;
  letter-spacing: 1px;
}

.hora {
  color: #333;
  font-weight: 500;
  font-size: 18px;
  margin: 0;
}

/* ========== SECCIÓN CONOCENOS ========== */
.separador-conocenos {
  display: flex;
  align-items: center;
  gap: 100px;
  margin: 30px 0;
}

.linea {
  height: 2px;
  background-color: #E0E0E0;
  flex: 1;
}

.texto-conocenos {
  color: #147146;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 3px;
  white-space: nowrap;
}

/* Galería */
.fila-galeria {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.contenedor-foto-galeria {
  flex: 0 0 calc(33.33% - 20px);
  min-width: 250px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.img-galeria-fix {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.img-galeria-fix:hover {
  transform: scale(1.05);
}

/* ========== SECCIÓN INFERIOR (Mapa, QR, Redes) ========== */
.seccion-inferior {
  margin-top: 40px;
}

.titulo-seccion {
  font-size: 24px;
  font-weight: 700;
  color: #147146;
  margin-bottom: 20px;
}

/* Tarjeta del Mapa */
.tarjeta-mapa {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 20px;
  height: 100%;
}

.contenedor-mapa {
  width: 100%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 15px;
}

.direccion-mapa {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.icono-ubicacion-mapa {
  width: 20px;
  height: 20px;
}

/* Tarjeta del Código QR */
.tarjeta-qr {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

.qr-imagen-container {
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.qr-imagen {
  width: 180px;
  height: 180px;
  display: block;
}

.qr-titulo {
  font-size: 28px;
  font-weight: 800;
  color: #147146;
  margin: 0 0 10px 0;
}

.qr-descripcion {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* Tarjeta de Redes Sociales */
.tarjeta-redes {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 80px 20px;
  height: 100%;
  text-align: center;
}

.titulo-seccion {
  font-size: 20px;
  font-weight: 700;
  color: #147146;
  margin-bottom: 25px;
  font-family: 'Mplus 1p', sans-serif;
}


.redes-sociales-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.red-social-item {
   display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: #f5f5f5;
  color: #333;
}

.red-social-item i {
   font-size: 22px;
  width: 30px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
 

}

.red-social-item.facebook {
   background-color: #1877f2;
  color: white;
}

.red-social-item.instagram {
    background: linear-gradient(45deg, #f09433, #d62976, #962fbf);
  color: white;

}

.red-social-item.whatsapp {
  background-color: #25d366;
  color: white;
}

.red-social-item:hover {
   transform: translateX(5px);
  filter: brightness(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Botón para subir (FAB) */
.btn-subir {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: linear-gradient(135deg, #147146, #0f5a38);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.btn-subir:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  background: linear-gradient(135deg, #0f5a38, #0a4529);
}

.btn-subir i {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}


/* ========== RESPONSIVE ========== */
@media (min-width: 768px) and (max-width: 991px) {
  .contenedor-imagen-principal {
    height: 300px;
  }
  
  .nombre-grande {
    font-size: 1.8rem;
  }
  
  .contenedor-logo-flotante img {
    width: 100px;
    height: 100px;
  }
  
  .contenedor-foto-galeria {
    flex: 0 0 calc(50% - 15px);
    height: 220px;
  }
  
  .contenedor-mapa {
    height: 250px;
  }
  
  .qr-imagen {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 767px) {
  .contenedor-imagen-principal {
    height: 250px;
  }
  
  .nombre-grande {
    font-size: 1.5rem;
  }
  
  .contenedor-logo-flotante img {
    width: 85px;
    height: 85px;
  }
  
  .contenedor-foto-galeria {
    flex: 0 0 100%;
    height: 200px;
  }
  
  .contenedor-mapa {
    height: 200px;
  }
  
  .qr-imagen {
    width: 120px;
    height: 120px;
  }
  
  .qr-titulo {
    font-size: 22px;
  }
  
  .red-social-item {
    padding: 10px 15px;
    min-width: 80px;
  }
  
  .red-social-item i {
    font-size: 24px;
  }
  
  .btn-subir {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
}
</style>