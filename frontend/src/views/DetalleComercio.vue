<template>
  <div class="container py-5" v-if="comercio">
    
    <div class="row g-4 align-items-start">
      <div class="col-lg-8"> 
        <div class="tarjeta-principal border-0 shadow-sm">
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

      <div class="col-lg-4">
        <div class="tarjeta-info-derecha border-0 shadow-sm p-4 mb-4">
          <div class="mb-3">
            <h2 class="nombreLocal">{{ comercio.nombre }}</h2>
            <p class="descripcion">{{ comercio.descripcion }}</p>
          </div>

          <div class="mb-3 d-flexflex-row  align-items-center text-secondary small">
           <img src="/img/localizacion.png" alt="localizacion" class="icono-ubicacion me-2">
            <span class="texto-direccion">{{ comercio.direccion || 'Casilda, Santa Fe' }}</span>
          </div>
          
          <div class="d-flex flex-row align-items-center gap-2 mb-4">
            <div v-if="comercio.delivery" class="etiqueta-pill-custom pill-verde">
              <img src="/img/repartidor.png" alt="Delivery" class="icono-custom me-2">
              <span>Delivery</span>
            </div>
            <div class="etiqueta-pill-custom pill-negro">
              <img src="/img/abierto.png" alt="Abierto" class="icono-custom me-2">
              <span>Abierto</span>
            </div>
          </div>


          <a :href="'https://wa.me/' + comercio.whatsapp" 
        target="_blank" 
         class="btn btn-whatsapp-custom w-100 shadow-sm">
              <i class="bi bi-whatsapp"></i>
           <span>Pedir por WhatsApp</span>
          </a>
        </div>

        <div class="tarjeta-horarios border-0 shadow-sm p-4 text-center">
          <h6 class="nuestros text-muted fw-bold mb-3 small text-uppercase letter-spacing-1">Nuestros Horarios</h6>
          <p class="hora mb-0 fw-bold fs-5">
            {{ comercio.horarios_json?.lunes_viernes || '08:00 - 20:00 hs' }}
          </p>
        </div>
      </div>
    </div>

    <div class="row mt-5 pt-5" v-if="comercio.galeria_fotos?.length">
      <div class="col-12">
        <div class="separador-conocenos mb-5">
          <div class="linea"></div>
          <span class="texto-conocenos">Conocenos</span>
          <div class="linea"></div>
        </div>
        <div class="fila-galeria-forzada"> 
          <div class="contenedor-foto-galeria" v-for="(foto, index) in comercio.galeria_fotos" :key="index">
            <img :src="'http://localhost:3000/img/' + foto" class="img-galeria-fix">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const comercio = ref<any>(null);

onMounted(async () => {
  try {
    const id = route.params.id; // Obtenemos el ID de la URL
    const response = await axios.get(`http://localhost:3000/api/comercios/${id}`);
    comercio.value = response.data;
  } catch (error) {
    console.error("Error al cargar el detalle:", error);
  }
});
</script>

<style scoped>
/* Contenedor forzado para pantallas grandes */
@media (min-width: 992px) {
  .flex-nowrap-custom {
    display: flex !important;
    flex-wrap: nowrap !important;
  }
}
/* Card Principal */

.tarjeta-principal {
  border-radius: 25px; /* Bordes bien redondeados */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* Sombra elegante */
  max-width:800px;
  width:60%;
  height:550px;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  margin: 50px 10px 20px 60px;
}
.contenedor-imagen-principal {
  width: 100%;
 
  height: 400px;
  position: relative;
}
.imagen-main {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CUERPO DE LA TARJETA: Centrado y Grande */
.cuerpo-tarjeta {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente */
  align-items: center;     /* Centra horizontalmente */
  text-align: center;
  padding-top: 60px !important; /* Espacio para que el logo no tape el nombre */
}

.nombre-grande {
  font-size: 3rem; /* Tamaño mucho más grande */
  font-weight: 600;
  margin-bottom: 40px;
  color: #0c0c0c;
}

.contenedor-logo-flotante {
  position: absolute;
  bottom: -60px; /* Hace que pise el borde inferior de la foto */
  left: 50%;    /* Alineado a la izquierda como en muchos diseños de Figma */
  transform: translateX(-50%); /* Centrado horizontal perfecto */
  z-index: 10;
  
}
.contenedor-logo-flotante img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-color: white;
  border: 5px solid white; /* Borde grueso blanco estilo Figma */
  box-shadow: 0 4px 15px rgba(0,0,0,0.15); /* Sombra suave para darle relieve */
  border-radius: 50%;
}
/* CARDS DERECHAS */
.tarjeta-info-derecha, .tarjeta-horarios {
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 30%;
  min-width:200px
 
}
.nombreLocal{
   font-size:45px;
    margin:20px 50px 20px;
    font-family:"Mplus 1p extra bold";
    font-weight:800;
  }

.descripcion {
  font-size:20px;
     margin:15px 30px 10px;
     font-family:"Mplus 1p thin";
     font-weight:100;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

/* Contenedor de los dos pills */
.d-flex.flex-row {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important; /* Prohíbe que el segundo pill se baje */
  align-items: center;
  gap:20px;
  margin-left:50px;
}
.etiqueta-pill-custom {
  display: inline-flex; /* Cambiar a inline-flex ayuda a que no ocupen todo el ancho */
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap; /* Evita saltos de línea internos */
  font-weight: bold;
  font-size: 1.8rem;
  /* Quitamos cualquier margin-bottom que pueda molestar */
  margin-bottom: 0 !important; 

}
.pill-verde {
  background-color: #F0F7F4;
  color: #147146;
  
}

.pill-negro {
  background-color:#F0F7F4;
  color: #147146;
  
}

/*btn WhatsApp*/
.btn-whatsapp-custom {
  height:25px;
  width:300px;
  background-color: #147146; 
  color: white !important;    /* Texto y logo en blanco */
  border-radius: 10px;       /* Forma de cápsula */
  font-weight: 700;
  font-size: 1.5rem;
  padding: 14px 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;                 /* Espacio entre el ícono y el texto */
  text-decoration: none;      /* Quita el subrayado del link */
  transition: all 0.3s ease;
  margin:20px 40px 40px 50px;
  
}

/* Tamaño del ícono de WhatsApp */
.btn-whatsapp-custom i {
  font-size: 3rem;
}

/* Ajuste opcional para que los íconos de Bootstrap se vean mejor */
.bi {
  vertical-align: middle;
}
.rounded-pill {
  transition: all 0.3s ease; /* Por si quieres que cambien al pasar el mouse */
}


.border-success {
  border-width: 2px !important; /* Bordes un poco más notables */
  border-color: #147146 !important; /* El verde que estás usando en el texto */
}

.border-dark {
  border-width: 2px !important;
  border-color: #333 !important;
}

/* Ajuste para que el texto de las etiquetas no se pegue */
.small {
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
/* ESTILO PARA TUS ICONOS PERSONALIZADOS */
.icono-custom {
  width: 25px;  /* Ajusta este valor según prefieras, 18px suele quedar bien */
  height: 25px; /* Mantén ancho y alto iguales */
  object-fit: contain; /* Asegura que el icono no se deforme */
  display: block; /* Ayuda a la alineación vertical */
  flex-shrink: 0;
  margin-right:10px;
}

/* Aseguramos que el contenedor del pill alinee todo al centro verticalmente*/
.etiqueta-pill {
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center; /* Centrado vertical perfecto */
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  border: 2px solid;
}
.icono-ubicacion {
  width: 25px;        /* Tamaño moderado para un icono de dirección */
  height: 25px;
  object-fit: contain;
  flex-shrink: 0;      /* Evita que el icono se achique si el texto es largo */
  display: block;
  margin:30px;

}

.texto-direccion {
  line-height:1;      /* Alinea la altura del texto con el icono */
  white-space: nowrap; /* Opcional: evita que la dirección salte de línea */
  overflow: hidden;    /* Opcional: por si la dirección es demasiado larga */
  text-overflow: ellipsis; 
  font-size:1.5rem;

}

/* El contenedor d-flex ya se encarga del resto */
.align-items-center {
  display: flex !important;
  align-items: center !important;

  
}
.tarjeta-horarios h6 {
  color:#848484;
  font-family:"Mplus 1p";
  font-weight:300;
  text-align:center;
  font-size:30px;
}

 .nuestros{
   margin-top:30px;
   margin-bottom:50px;
 }

 .hora{
  color:#848484;
  font-family:"Mplus 1p";
  font-weight:300;
  text-align:left;
  font-size:25px;
  margin-left:30px;
  margin-top:30px;
 }

/* Galería de Fotos */
.fila-galeria-forzada {
  display: flex;
  flex-direction: row; /* Fuerza la fila */
  justify-content: center;
  gap: 80px;
  width: 100%;
  overflow-x: auto; /* Por si la pantalla es muy chica, permite scroll */
  margin-top:60px;
}

.contenedor-foto-galeria {
  flex: 0 0 400px; /* No permite que se achiquen de los 400px */
  height: 500px;
  border-radius: 20px;
  object-fit: cover;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.img-galeria-fix {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* Estilos del Separador */
.separador-conocenos {
  display: flex;
  align-items: center;
}


.linea {
  height: 1px;
  background-color: #C0BDBD;
  flex-grow: 1;
  margin:0 60px 0 40px;
}

.texto-conocenos {
  color: #147146;
  font-weight: 700;
  font-size: 3rem;
  letter-spacing: 6px;
  margin: 70px 40px 20px; /* Aquí controlas qué tan lejos están las líneas */
  
}
.letter-spacing-1 {
  letter-spacing: 1px;
}

</style>