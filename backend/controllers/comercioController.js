const db = require('../config/db');

// Obtener todos los comercios
exports.getAllComercios = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT c.*, cat.nombre as categoria_nombre 
            FROM comercios c 
            LEFT JOIN categorias cat ON c.id_categoria = cat.id_categoria
        `);
        
        // Parsear los campos JSON para cada comercio
        const comercios = rows.map(comercio => ({
            ...comercio,
            galeria_fotos: comercio.galeria_fotos ? 
                (typeof comercio.galeria_fotos === 'string' ? JSON.parse(comercio.galeria_fotos) : comercio.galeria_fotos) : [],
            horarios_json: comercio.horarios_json ? 
                (typeof comercio.horarios_json === 'string' ? JSON.parse(comercio.horarios_json) : comercio.horarios_json) : null,
            redes_sociales: comercio.redes_sociales ? 
                (typeof comercio.redes_sociales === 'string' ? JSON.parse(comercio.redes_sociales) : comercio.redes_sociales) : null
        }));
        
        res.json(comercios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un comercio específico por ID
exports.getComercioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM comercios WHERE id_comercio = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Comercio no encontrado' });
        }
        
        // Parsear los campos JSON
        const comercio = {
            ...rows[0],
            galeria_fotos: rows[0].galeria_fotos ? 
                (typeof rows[0].galeria_fotos === 'string' ? JSON.parse(rows[0].galeria_fotos) : rows[0].galeria_fotos) : [],
            horarios_json: rows[0].horarios_json ? 
                (typeof rows[0].horarios_json === 'string' ? JSON.parse(rows[0].horarios_json) : rows[0].horarios_json) : null,
            redes_sociales: rows[0].redes_sociales ? 
                (typeof rows[0].redes_sociales === 'string' ? JSON.parse(rows[0].redes_sociales) : rows[0].redes_sociales) : null
        };
        
        res.json(comercio);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo comercio
exports.createComercio = async (req, res) => {
    const { 
        nombre, 
        descripcion, 
        id_categoria, 
        subcategoria, 
        whatsapp, 
        google_maps,
        direccion_texto,
        imagen_url, 
        logo_url,
        delivery,
        horarios_json,
        galeria_fotos,
        redes_sociales,
        destacado
    } = req.body;
    
    try {
        const [result] = await db.query(
            `INSERT INTO comercios (
                nombre, descripcion, id_categoria, subcategoria, whatsapp, 
                google_maps, direccion_texto, imagen_url, logo_url, 
                delivery, horarios_json, galeria_fotos, redes_sociales, destacado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre, 
                descripcion, 
                id_categoria, 
                subcategoria, 
                whatsapp, 
                google_maps,
                direccion_texto,
                imagen_url, 
                logo_url,
                delivery || 0,
                horarios_json ? JSON.stringify(horarios_json) : null,
                galeria_fotos ? JSON.stringify(galeria_fotos) : null,
                redes_sociales ? JSON.stringify(redes_sociales) : null,
                destacado || 0
            ]
        );
        
        res.json({ message: 'Comercio creado con éxito', id: result.insertId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un comercio
exports.updateComercio = async (req, res) => {
    const { id } = req.params;
    const { 
        nombre, 
        descripcion, 
        id_categoria, 
        subcategoria, 
        whatsapp, 
        google_maps,
        direccion_texto,
        imagen_url, 
        logo_url,
        delivery,
        horarios_json,
        galeria_fotos,
        redes_sociales,
        destacado
    } = req.body;
    
    try {
        const [result] = await db.query(
            `UPDATE comercios SET 
                nombre = ?, descripcion = ?, id_categoria = ?, subcategoria = ?, 
                whatsapp = ?, google_maps = ?, direccion_texto = ?, imagen_url = ?, 
                logo_url = ?, delivery = ?, horarios_json = ?, galeria_fotos = ?, 
                redes_sociales = ?, destacado = ?
            WHERE id_comercio = ?`,
            [
                nombre, descripcion, id_categoria, subcategoria, whatsapp, 
                google_maps, direccion_texto, imagen_url, logo_url,
                delivery || 0,
                horarios_json ? JSON.stringify(horarios_json) : null,
                galeria_fotos ? JSON.stringify(galeria_fotos) : null,
                redes_sociales ? JSON.stringify(redes_sociales) : null,
                destacado || 0,
                id
            ]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comercio no encontrado' });
        }
        
        res.json({ message: 'Comercio actualizado con éxito' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un comercio
exports.deleteComercio = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM comercios WHERE id_comercio = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comercio no encontrado' });
        }
        
        res.json({ message: 'Comercio eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};