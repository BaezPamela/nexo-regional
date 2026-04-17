<template>
  <div class="home">
    <!-- SECCIÓN 1: HERO CON FONDO Y BUSCADOR -->
    <section class="hero-section">
      <div class="hero-overlay-top"></div>
      <div class="hero-overlay-bottom"></div>
      <div class="container position-relative">
        <div class="hero-content">
          
          <!-- Contenedor con efecto esmerilado - AHORA SEPARADO -->
          <div class="glass-wrapper">
            <div class="glass-container">
              <h1 class="hero-title">
                Conectando <span class="highlight-casilda">Casilda</span> a un click
              </h1>
              <p class="hero-subtitle">
               Encontrá los mejores comercio y servicios de nuestra ciudad.
              </p>
            </div>
          </div>

          <!-- Barra de búsqueda principal -->
          <div class="search-container">
            <div class="search-wrapper">
              <div class="search-input-group">
                <i class="bi bi-search"></i>
                <input 
                  type="text" 
                  v-model="terminoBusqueda"
                  placeholder="¿Qué estás buscando?" 
                  class="search-input"
                >
              </div>
              <div class="category-select-group">
                <i class="bi bi-grid-3x3-gap-fill"></i>
                <select v-model="categoriaSeleccionada" class="category-select">
                  <option value="">Selecciona tu categoría</option>
                  <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">
                    {{ cat.nombre }}
                  </option>
                </select>
              </div>
              <button @click="buscar" class="search-btn">
                <i class="bi bi-search"></i> Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2: CATEGORÍAS CON CÍRCULOS ANIMADOS -->
    <div class="categories-wrapper">
      <div class="container">
        <div class="categories-grid">
          <div 
            v-for="cat in categorias" 
            :key="cat.id_categoria"
            class="category-circle"
            @click="irACategoria(cat.id_categoria)"
          >
            <div class="circle-image">
              <img :src="getCategoriaIcono(cat.nombre)" :alt="cat.nombre">
            </div>
            <span class="circle-label">{{ cat.nombre }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SECCIÓN 3: DESTACADOS DEL MES -->
    <section class="destacados-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Destacados de Mes</h2>
          <div class="section-controls">
            <button class="nav-btn prev-btn" @click="scrollCards('prev')">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="nav-btn next-btn" @click="scrollCards('next')">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <div class="cards-container" ref="cardsContainer">
          <div class="cards-wrapper" :style="cardsTransform">
            <div v-for="comercio in destacados" :key="comercio.id_comercio" class="card-item">
              <div class="destacado-card" @click="verDetalle(comercio.id_comercio)">
                <div class="card-image">
                  <img :src="'http://localhost:3000/img/' + comercio.imagen_url" :alt="comercio.nombre">
                  <div class="card-logo" v-if="comercio.logo_url">
                    <img :src="'http://localhost:3000/img/' + comercio.logo_url" alt="logo">
                  </div>
                </div>
                <div class="card-info">
                  <h4>{{ comercio.nombre }}</h4>
                  <p>{{ comercio.descripcion?.slice(0, 40) }}...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4: PROMOCIONES ESPECIALES (CARROUSEL) -->
    <section class="promociones-section">
      <div class="container">
        <h2 class="section-title text-center">Promociones Especiales</h2>
        
        <div class="carousel-container">
          <button class="carousel-btn carousel-prev" @click="prevPromo">
            <i class="bi bi-chevron-left"></i>
          </button>
          
          <div class="carousel-track">
            <div class="carousel-slides" :style="carouselTransform">
              <div v-for="(promo, index) in promociones" :key="index" class="carousel-slide">
                <div class="promo-card">
                  <div class="promo-badge">-{{ promo.descuento }}%</div>
                  <div class="promo-image">
                    <img :src="'http://localhost:3000/img/' + promo.imagen_url" :alt="promo.titulo">
                  </div>
                  <div class="promo-info">
                    <h3>{{ promo.titulo }}</h3>
                    <p>{{ promo.descripcion }}</p>
                    <div class="promo-pill">PROMO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button class="carousel-btn carousel-next" @click="nextPromo">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        
        <div class="carousel-dots">
          <span 
            v-for="(_, index) in promociones" 
            :key="index"
            class="dot"
            :class="{ active: currentPromoIndex === index }"
            @click="goToPromo(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5: BANNER CON FRASE -->
    <section class="banner-section">
      <div class="container">
        <div class="banner-content">
          
          <h2 class="banner-title">Tu ciudad, tus comercios, ¡Tu Nexo Local!</h2>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const terminoBusqueda = ref('');
const categoriaSeleccionada = ref('');
const categorias = ref([]);
const destacados = ref([]);
const promociones = ref([]);
const currentIndex = ref(0);
const currentPromoIndex = ref(0);
const cardsContainer = ref(null);
let autoPlayInterval = null;

// Datos de ejemplo para promociones
const promocionesData = [
  { descuento: 8, titulo: 'Cafetería Aroma', descripcion: 'Comida especial', imagen_url: 'promo1.jpg' },
  { descuento: 20, titulo: 'Pizzería Elite', descripcion: 'Comidas superiores', imagen_url: 'promo2.jpg' },
  { descuento: 15, titulo: 'Restó Sabor', descripcion: 'Productos del día', imagen_url: 'promo3.jpg' }
];

const cardsTransform = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 340}px)`
  };
});

const carouselTransform = computed(() => {
  return {
    transform: `translateX(-${currentPromoIndex.value * 100}%)`
  };
});

const getCategoriaIcono = (nombre) => {
  const iconos = {
    'Gastronomía': '/img/gastronomia.png',
    'Tiendas': '/img/tiendas.png',
    'Servicios': '/img/servicios.png',
    'Salud y Belleza': '/img/salud.png',
    'Hogar y Deco': '/img/hogarDeco.png',
    'Profesionales': '/img/profesionales.png'
  };
  return iconos[nombre] || '/img/icon-default.png';
};

const cargarCategorias = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias');
    categorias.value = response.data;
  } catch (error) {
    console.error('Error:', error);
    categorias.value = [
      { id_categoria: 1, nombre: 'Gastronomía' },
      { id_categoria: 2, nombre: 'Tiendas' },
      { id_categoria: 3, nombre: 'Servicios' },
      { id_categoria: 4, nombre: 'Salud y Belleza' },
      { id_categoria: 5, nombre: 'Hogar y Deco' },
      { id_categoria: 6, nombre: 'Profesionales' }
    ];
  }
};

const cargarDestacados = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/comercios');
    destacados.value = response.data.filter(c => c.destacado).slice(0, 8);
  } catch (error) {
    console.error('Error:', error);
    destacados.value = [
      { id_comercio: 1, nombre: 'Cafetería Aroma', descripcion: 'Comida guisada', imagen_url: 'default.jpg', logo_url: 'logo.png' },
      { id_comercio: 2, nombre: 'Banquillos y Elite', descripcion: 'Comidas superiores', imagen_url: 'default.jpg', logo_url: 'logo.png' },
      { id_comercio: 3, nombre: 'Presentación Sabor', descripcion: 'Productos del día', imagen_url: 'default.jpg', logo_url: 'logo.png' },
      { id_comercio: 4, nombre: 'Aires Delicias', descripcion: 'Dishes, bebidas', imagen_url: 'default.jpg', logo_url: 'logo.png' }
    ];
  }
};

const cargarPromociones = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/promociones');
    promociones.value = response.data;
  } catch (error) {
    promociones.value = promocionesData;
  }
};

const scrollCards = (direction) => {
  const maxIndex = Math.max(0, destacados.value.length - 3);
  if (direction === 'next' && currentIndex.value < maxIndex) {
    currentIndex.value++;
  } else if (direction === 'prev' && currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const prevPromo = () => {
  currentPromoIndex.value = currentPromoIndex.value === 0 
    ? promociones.value.length - 1 
    : currentPromoIndex.value - 1;
  resetAutoPlay();
};

const nextPromo = () => {
  currentPromoIndex.value = currentPromoIndex.value === promociones.value.length - 1 
    ? 0 
    : currentPromoIndex.value + 1;
  resetAutoPlay();
};

const goToPromo = (index) => {
  currentPromoIndex.value = index;
  resetAutoPlay();
};

const resetAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
    nextPromo();
  }, 5000);
};

const buscar = () => {
  router.push({
    path: '/comercios',
    query: {
      busqueda: terminoBusqueda.value,
      categoria: categoriaSeleccionada.value
    }
  });
};

const irACategoria = (categoriaId) => {
  router.push({
    path: '/comercios',
    query: { categoria: categoriaId }
  });
};

const verDetalle = (id) => {
  router.push(`/comercio/${id}`);
};

const buscarComercios = () => {
  router.push('/comercios');
};

onMounted(() => {
  cargarCategorias();
  cargarDestacados();
  cargarPromociones();
  resetAutoPlay();
});
</script>

<style scoped>
/* ========== ESTILOS BASE ========== */
.home {
  width: 100%;
  overflow-x: hidden;
  background: white;
}

/* ========== SECCIÓN HERO ========== */
.hero-section {
  position: relative;
  background-image: url('/img/casilda aerea.jpg');
  background-size: cover;
  background-position: center;
  min-height: 550px;
  display: flex;
  align-items: center;
  text-align: center;
}

/* Gradiente superior: muy sutil */
.hero-overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 35%;
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.1) 10%,
    transparent 20%
  );
  pointer-events: none;
}

/* Gradiente inferior: difuminado a blanco puro */
.hero-overlay-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65%;
  background: linear-gradient(180deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.3) 70%,
    #ffffff 100%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* CONTENEDOR CON EFECTO ESMERILADO */
.glass-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  margin-top: -100px;
}

.glass-container {
  display: inline-block;
  background: rgba(0, 0, 0, 0.10);
  backdrop-filter: blur(2px);
  border-radius: 20px;
  padding: 15px 50px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
 
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
  color: white;
}

.highlight-casilda {
  color: #EF7916;
  position: relative;
  display: inline-block;
}

.highlight-casilda:hover {
  text-shadow: 0 0 8px rgba(239, 121, 22, 0.5);
  transition: all 0.3s ease;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.95;
  margin-bottom: 0;
  color: white;
}

/* Barra de búsqueda */
.search-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.search-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background: white;
  border-radius: 15px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-input-group {
  flex: 2;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 12px 20px;
  gap: 10px;
}

.search-input-group i {
  color: #999;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 1rem;
}

.category-select-group {
  flex: 1.5;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 12px 20px;
  gap: 10px;
}

.category-select-group i {
  color: #999;
}

.category-select {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
}

.search-btn {
  background: #EF7916;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #d4620a;
  transform: scale(1.02);
}

/* ========== CATEGORÍAS ========== */
.categories-wrapper {
  position: relative;
  z-index: 5;
  margin-top: -60px;
  margin-bottom: 40px;
  background: transparent;
}

.categories-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  background: white;
  border-radius: 20px;
  padding: 20px 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  max-width: 65%;
  margin: 0 auto;
}

.category-circle {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: -60px;
}

.category-circle:hover {
  transform: translateY(-5px);
}

.circle-image {
  width: 85px;
  height: 85px;
  background: #f0f7f4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
  border: 3px solid white;
}

.category-circle:hover .circle-image {
  transform: scale(1.1);
  background: #f0f7f4;
  box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.category-circle:hover .circle-image img {
  transform: scale(1.05);
}

.circle-image img {
  width: 45px;
  height: 45px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.circle-label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-top: 5px;
  display: block;
}

.category-circle:hover .circle-label {
  color: #176E43;
}

/* ========== DESTACADOS ========== */
.destacados-section {
  padding: 50px 0;
  background: #f8f9fa;
  position: relative;
  z-index: 2;
}

.section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #176E43;
  margin: 0;
  text-align: center;
}

/* Líneas a los lados del título */
.section-title::before,
.section-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 500px;
  height: 2px;
  background: #C0BDBD;
  opacity: 0.3;
  
}

.section-title::before {
  right: calc(50% + 150px);
}

.section-title::after {
  left: calc(50% + 150px);
}

/* Para "Promociones Especiales" que está centrado */
.promociones-section .section-title {
  text-align: center;
  position: relative;
  display: inline-block;
  left: 12%;
  transform: translateX(-50%);
  white-space: nowrap;

}


.promociones-section .section-title::before,
.promociones-section .section-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 100px;
  height: 2px;
  background: #C0BDBD;
  opacity: 0.3;
}

.promociones-section .section-title::before {
  right: calc(100% + 30px);
}

.promociones-section .section-title::after {
  left: calc(100% + 30px);
}

.section-controls {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 0;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #176E43;
  color: white;
  border-color: #176E43;
}

.cards-container {
  overflow: hidden;
  position: relative;
}

.cards-wrapper {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
}

.card-item {
  flex: 0 0 320px;
}

.destacado-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.destacado-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  height: 250px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-logo {
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

.card-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.card-info {
  padding: 30px 15px 15px;
}

.card-info h4 {
  margin: 0 0 5px;
  font-size: 1.1rem;
  color: #176E43;
}

.card-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

/* ========== PROMOCIONES ========== */
.promociones-section {
  padding: 40px 0;
  background: white;
  position: relative;
  z-index: 2;
  text-align: center;
  
}

.promociones-section .section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #176E43;
  margin: 0 auto 30px;
  display: inline-block;
  position: relative;
  white-space: nowrap;
}

/* Líneas a los lados de "Promociones Especiales" */
.promociones-section .section-title::before,
.promociones-section .section-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 500px;
  height: 2px;
  background: #C0BDBD;
  opacity: 0.3;
}

.promociones-section .section-title::before {
  right: calc(100% + 20px);
}

.promociones-section .section-title::after {
  left: calc(100% + 20px);
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.carousel-track {
  flex: 1;
  overflow: hidden;
}

.carousel-slides {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex: 0 0 100%;
  padding: 0 15px;
}

.promo-card {
  position: relative;
  background: linear-gradient(135deg, #176E43, #0f5a38);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: white;
}

.promo-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff6b35;
  padding: 8px 15px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 2;
}

.promo-image {
  flex: 1;
  height: 250px;
}

.promo-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-info {
  flex: 1;
  padding: 30px;
  text-align: center;
}

.promo-info h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.promo-pill {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 8px 20px;
  border-radius: 50px;
  margin-top: 15px;
  font-weight: 600;
}

.carousel-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-btn:hover {
  background: #176E43;
  color: white;
  border-color: #176E43;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  width: 25px;
  border-radius: 10px;
  background: #176E43;
}

/* ========== BANNER ========== */
.banner-section {
  background-image: url('/img/banner.jpg');
  background-size: cover;
  background-position: center;
  padding: 30px 20px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.banner-content {
  color: white;
}

.banner-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.banner-title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.banner-btn {
  background: #EF7916;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 40px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-btn:hover {
  background: #d4620a;
  transform: scale(1.05);
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px) {
  .section-title::before,
  .section-title::after {
    width: 50px;
  }
  
  .section-title::before {
    right: calc(50% + 120px);
  }
  
  .section-title::after {
    left: calc(50% + 120px);
  }
  
  .categories-grid {
    max-width: 90%;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
  }
  
  .glass-container {
    padding: 10px 25px;
    margin: 0 15px 20px 15px;
  }
  
  .glass-wrapper {
    margin-top: -60px;
  }
  
  .search-wrapper {
    flex-direction: column;
    border-radius: 15px;
  }
  
  .search-input-group,
  .category-select-group,
  .search-btn {
    border-radius: 10px;
  }
  
  .categories-wrapper {
    margin-top: -40px;
  }
  
  .categories-grid {
    gap: 20px;
    padding: 15px 20px;
    border-radius: 30px;
    max-width: 95%;
  }
  
  .circle-image {
    width: 65px;
    height: 65px;
  }
  
  .circle-image img {
    width: 35px;
    height: 35px;
  }
  
  .circle-label {
    font-size: 0.75rem;
  }
  
  .category-circle {
    margin-top: -20px;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .section-title::before,
  .section-title::after {
    width: 30px;
  }
  
  .section-title::before {
    right: calc(50% + 80px);
  }
  
  .section-title::after {
    left: calc(50% + 80px);
  }
  
  .promociones-section .section-title::before,
  .promociones-section .section-title::after {
    width: 40px;
  }
  
  .promociones-section .section-title::before {
    right: calc(100% + 10px);
  }
  
  .promociones-section .section-title::after {
    left: calc(100% + 10px);
  }
  
  .section-controls {
    position: relative;
    justify-content: center;
    margin-top: 15px;
  }
  
  .section-header {
    flex-direction: column;
  }
  
  .card-item {
    flex: 0 0 280px;
  }
  
  .promo-card {
    flex-direction: column;
  }
  
  .promo-image {
    width: 100%;
    height: 200px;
  }
  
  .banner-title {
    font-size: 1.2rem;
  }
  
  .banner-section {
    padding: 10px 15px;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    gap: 15px;
    padding: 12px 15px;
  }
  
  .circle-image {
    width: 55px;
    height: 55px;
  }
  
  .circle-image img {
    width: 28px;
    height: 28px;
  }
  
  .circle-label {
    font-size: 0.65rem;
  }
  
  .section-title::before,
  .section-title::after {
    display: none;
  }
  
  .hero-title {
    font-size: 1.2rem;
  }
  
  .glass-container {
    padding: 8px 15px;
  }
}
</style>