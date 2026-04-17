const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuario
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        console.log('Intento de login:', username);
        
        // Buscar usuario por username
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE username = ?',
            [username]
        );
        
        if (rows.length === 0) {
            console.log('Usuario no encontrado:', username);
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        
        const usuario = rows[0];
        console.log('Usuario encontrado:', usuario.username);
        
        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValida) {
            console.log('Contraseña incorrecta para:', username);
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
        
        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id_usuario, username: usuario.username },
            process.env.JWT_SECRET || 'secreto_super_seguro',
            { expiresIn: '8h' }
        );
        
        console.log('Login exitoso para:', username);
        
        res.json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id_usuario,
                username: usuario.username
            }
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Registrar nuevo usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Insertar usuario
        const [result] = await db.query(
            'INSERT INTO usuarios (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        
        res.json({
            message: 'Usuario creado exitosamente',
            id: result.insertId
        });
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'El nombre de usuario ya existe' });
        } else {
            console.error('Error en registro:', error);
            res.status(500).json({ error: error.message });
        }
    }
};