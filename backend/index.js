const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const comercioRoutes = require('./routes/comercioRoutes');
const app = express();
const adminRoutes = require('./routes/adminRoutes');

// Middlewares
app.use(cors()); 
app.use(express.json()); 
app.use('/img', express.static('public/img'));



// Rutas
app.use('/api/comercios', comercioRoutes);
app.use('/api/admin', adminRoutes);

// Ruta de prueba para verificar que el servidor vive
app.get('/test', (req, res) => {
    res.send('Servidor de Nexo Regional funcionando correctamente 🚀');
});

// Ruta de prueba para verificar la conexión a la DB
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Conexión a MySQL exitosa', data: rows });
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la DB', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});