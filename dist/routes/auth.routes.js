import { Router } from 'express';
import { check } from 'express-validator';
import { login, validarToken, forgotPassword, resetPassword, validateCaptcha } from '../controllers/auth.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
const router = Router();
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login);
router.get('/', [validarJWT], validarToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/validate-captcha', validateCaptcha);
export default router;
