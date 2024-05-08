const { Router } = require('express');

const clasificacionController = require('../controllers/clasificacion.controller');
const router = Router();

router.get('/', clasificacionController.readClasificacion);

router.get('/:nombre', clasificacionController.readUser_nombre);
//router.get('/:id', clasificacionController.readUser_id);

router.post('/', clasificacionController.postClasificacion);

//router.delete('/:nombre', clasificacionController.deleteClasificacion_nombre);
router.delete('/:id', clasificacionController.deleteClasificacion);


module.exports = router; 