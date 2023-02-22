import { Router } from 'express';


import { validarJWT } from './../middlewares/validar-jwt.js';
import { getEgresos,getEgreso,postEgreso,putEgreso,deleteEgreso,postEgresos } from '../controllers/egresos.js';

const router = Router();

router.get('/',[validarJWT]  ,     getEgresos );
router.get('/:id',[validarJWT] ,   getEgreso );
router.post('/', [validarJWT] ,    postEgreso );
router.post('/masivo', postEgresos );
router.put('/:id',  [validarJWT],  putEgreso );
router.delete('/:id', [validarJWT], deleteEgreso );

export default router;