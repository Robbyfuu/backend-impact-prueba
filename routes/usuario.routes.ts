import { Router } from 'express';


import { getDashboard } from '../controllers/dashboard.js';
import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios.js';


const router = Router();


router.get('/',       getUsuarios );
router.get('/:id',    getUsuario );
router.post('/',      postUsuario );
router.put('/:id',    putUsuario );
router.delete('/:id', deleteUsuario );
router.get('/principal/dashboard', getDashboard);



export default router;