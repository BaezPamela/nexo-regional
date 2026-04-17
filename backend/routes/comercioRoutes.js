const express = require('express');
const router = express.Router();
const comercioController = require('../controllers/comercioController');

// Definimos los endpoints
router.get('/', comercioController.getAllComercios);
router.post('/', comercioController.createComercio);
router.get('/:id', comercioController.getComercioById);
router.put('/:id', comercioController.updateComercio);  
router.delete('/:id', comercioController.deleteComercio);

module.exports = router;