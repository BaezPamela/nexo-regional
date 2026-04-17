<template>
  <div id="app">
    <!-- Solo mostrar navbar y footer si NO es ruta de admin -->
    <template v-if="!isAdminRoute">
      <nav class="navbar navbar-expand-lg navbar-dark bg-verde-nexo sticky-top shadow-sm">
        <div class="container">
          <router-link class="navbar-brand d-flex align-items-center" to="/">
            <img src="/img/logo-nexo.png" alt="Nexo Regional" class="logo-navbar me-2">
            <div class="contenedor-nombre">
              <span class="palabra-nexo">Nexo</span>
              <span class="palabra-regional">Regional</span>
            </div>
          </router-link>

          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto d-flex align-items-center gap-4">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Inicio</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Categorias">Comercios</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Categorias">Promociones</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </template>

    <router-view />

    <template v-if="!isAdminRoute">
      <footer class="footer">
        <div class="container">
          <div class="row align-items-center">
            <!-- Columna 1: Logo -->
            <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <div class="logo-container">
                <img src="/img/logo-nexo.png" alt="Nexo Regional" class="footer-logo">
                <p>La guía más completa de Casilda</p>
              </div>
              <div class="social-links mt-3">
                <div class="d-flex gap-2 justify-content-center justify-content-lg-start">
                  <a href="#" class="social-icon" target="_blank">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="#" class="social-icon" target="_blank">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="#" class="social-icon" target="_blank">
                    <i class="bi bi-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Columna 2: Categorías -->
            <div class="col-lg-5 col-md-12 mb-4 mb-lg-0 categorias-col">
              <div class="categorias-container">
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Gastronomía</h6>
                </div>
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Tiendas</h6>
                </div>
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Servicios</h6>
                </div>
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Salud y Belleza</h6>
                </div>
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Hogar y Deco</h6>
                </div>
                <div class="categoria-item">
                  <h6><img src="/img/flecha.png" alt="item" class="itemCategoria me-2"> Profesionales</h6>
                </div>
              </div>
            </div>

            <!-- Columna 3: Publicidad -->
            <div class="col-lg-4 col-md-12 text-center text-lg-end">
              <div class="publicidad-container">
                <h5>¿Sos comerciante?</h5>
                <p>Sumá tu negocio hoy mismo y llegá a toda la ciudad</p>
                <button class="btn-light">
                  <img src="/img/cohete.png" alt="cohete" class="cohete-icon me-2">
                  Quiero Publicitar Mi Negocio
                </button>
              </div>
            </div>
          </div>
          <hr class="bg-light my-4 opacity-25">
          <div class="text-center text-white-50 small">
            <p class="mb-0">
                 © 2026 Nexo Regional - Todos los derechos reservados. 
                  Diseño y Desarrollo por 
                   <a 
                     href="https://wa.me/5493464693002?text=Hola,%20necesito%20hacerte%20una%20consulta%20sobre%20un%20desarrollo%20web" 
                     target="_blank" 
                       class="link-ideas-dev"
                        >
                         Ideas Dev
                   </a>
            </p>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<style>
/* Variables */
:root {
  --verde-nexo: #176E43;
  --naranja-nexo: #EF7916;
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Mplus 1p Bold', sans-serif;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1;
}

/* ========== NAVBAR ========== */
.navbar {
  background-color: #176E43 !important;
  padding: 0.5rem 0 !important;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-navbar {
  height: 70px;
  width: auto;
  margin-left:-20px;
}

.contenedor-nombre {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.palabra-nexo {
  color: #FFFFFF;
  font-family: "Lalezar", sans-serif;
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
  margin-left:-20px;
}

.palabra-regional {
  color: #FFFFFF;
  font-family: "Lao Muang Don", sans-serif;
  font-size: 28px;
  font-weight: 200;
  line-height: 1;
}

.navbar-nav {
  gap: 3rem !important;
}

.nav-item {
  list-style: none;
  font-size:20px;
   margin-right: 1rem !important;
}

.nav-link {
  color: #ffffff !important;
  font-size: 20px;
  font-family: "Lao Muang Don", sans-serif;
 padding-left: 0 !important;
  padding-right: 0 !important;
  transition: all 0.3s ease;
 
}

.nav-link:hover {
  color: #ffffff !important;
  text-decoration: underline !important;
  opacity: 0.9;
}

.navbar-toggler {
  border: none !important;
  box-shadow: none !important;
}

.navbar-toggler:focus {
  box-shadow: none !important;
}

/* ========== FOOTER ========== */
.footer {
  background-color: #186A44;
  color: white;
  padding: 1.rem 0 1rem 0;
  margin-top: 50px;;

}

/* Logo footer */
.footer-logo {
  width: 140px;
  height: auto;
   margin-top: 15px; 
  display: block;
  margin-bottom: 5px; /* Reducido de 10px a 5px */
  
}
 

.logo-container {
  margin-top: -10px; /* Espacio adicional para subir todo el contenedor */
  margin-left: -12px;
  margin-bottom:20px;
 
  
 
}
.logo-container p{
  font-size:18PX;
  margin-left:-40px;
  margin-top: 15px !important; /* Sube la frase hacia arriba */
  margin-bottom: 0;
}

/* Categorías - Verticales */
.categorias-container {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
   justify-content: center; /* Centra verticalmente */
  height: 100%; /* Toma toda la altura disponible */
  margin:20PX 200PX 20PX;
  padding:5px 60px;
}

.categorias-col {
  display: flex;
  align-items: center; /* Centra verticalmente */
}

.categoria-item h6 {
  color: white;
  font-size: 1.1rem;
  font-family: "Mplus 1p", sans-serif;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
   justify-content: flex-start; /* Alineación a la izquierda dentro del contenedor */
    white-space: nowrap; /* Esto evita que el texto salte a 2 líneas */
}

.itemCategoria {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.categoria-item:hover {
  transform: translateX(5px);
  cursor: pointer;
}

.categoria-item:hover .itemCategoria {
  transform: translateX(3px);
}

/* Redes Sociales */
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  color: white;
}

/* Card de publicidad */

.btn-light {
  transition: all 0.3s ease;
  background-color: #C0BDBD;
  color: #030303;
  border: none;
  padding:10px 10px;
  align-items: center;
  margin-top:10px;
  font-size: 1.1rem; 
  font-weight: 700; /* Texto más negrita */
  margin-right:30px;
}


.btn-light:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px #dfdcdc;
  background-color: #f8f9fa;
}

.btn-light:hover .cohete-icon {
  transform: translateX(3px) translateY(-3px);
  
}
.cohete-icon{
  width:25px;
  height:25px;
  
}
.publicidad-container p{
  font-size:15px;
  margin-left:15px;
}

.publicidad-container h5{
  font-size:20px;
  margin-right:75px;
}


/* Línea divisoria */
.footer hr {
  opacity: 0.2;
   margin: 15px 0 !important;
  }

.text-center p{
  font-size:13px;
  }

.footer .text-center.small {
  margin-top: -5px; /* Sube el párrafo */
}

.footer .text-center.small p {
  margin-bottom: 0;
  line-height: 1; /* Reduce la altura de línea */
}
.link-ideas-dev {
  color: #FFAE6B;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.link-ideas-dev:hover {
  color: #EF7916;
  text-decoration: underline;
 
  transform: scale(1.04);
}

.link-ideas-dev i {
  font-size: 14px;
}




/* ========== RESPONSIVE ========== */
/* Desktop (992px y más) - las 3 columnas una al lado de otra */
@media (min-width: 992px) {
  .row {
    display: flex;
    flex-wrap: nowrap; /* Fuerza que no se apilen */
    align-items: stretch;
  }
  
  .col-lg-3 {
    width: 25%;
  }
  
  .col-lg-5 {
    width: 41.666%;
    display: flex;
    align-items: center; /* Centra verticalmente todo el contenido */

  }
  
  .col-lg-4 {
    width: 33.333%;
  }
}

/* Tablet (768px a 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .footer {
    text-align: center;
  }
  
  .categorias-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
       
  }
  
  .categoria-item {
    width: calc(33.33% - 1rem);
  }
  
  .categoria-item h6 {
    justify-content: center;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .link-ideas-dev {
    display: inline-flex;
    justify-content: center;
  }
}

/* Móvil (menos de 768px) */
@media (max-width: 767px) {
  .navbar-brand {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .contenedor-nombre {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  
  .palabra-nexo {
    font-size: 32px;
  }
  
  .palabra-regional {
    font-size: 22px;
  }
  
  .logo-navbar {
    height: 55px;
  }
  
  .footer {
    text-align: center;
    padding: 2rem 0 1rem 0;
  }
  
  .footer-logo {
    width: 130px;
  }
  
  .categorias-container {
    align-items: center;
  }
  
  .categoria-item h6 {
    justify-content: center;
    font-size: 0.9rem;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .btn-light {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
</style>