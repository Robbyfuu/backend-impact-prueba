
import { validarJWT } from "../middlewares/validar-jwt.js";
import { Router } from "express";
import {
    getLicenciasMedicas,
    getLicenciaMedicaTrabajador,
    postLicenciaMedica,
    putLicenciaMedica,
    putDesactivarLicenciaMedica,
    deleteLicenciaMedica,
    getLicenciasMedicasActivas,
    getLicenciasMedicasTerminadas,
    postLicenciasMedicasMasiva
} from "../controllers/licencias_medicas.js";

const router = Router();

router.get("/", [validarJWT], getLicenciasMedicas);
router.get("/activas", [validarJWT], getLicenciasMedicasActivas);
router.get("/terminadas", [validarJWT], getLicenciasMedicasTerminadas);
router.get("/col/", [validarJWT], getLicenciaMedicaTrabajador);
router.post("/", [validarJWT], postLicenciaMedica);
router.put("/:id", [validarJWT], putLicenciaMedica);
router.get("/desactivar/hoy", putDesactivarLicenciaMedica);
router.delete("/:id", [validarJWT], deleteLicenciaMedica);
router.post('/carga/masiva', [validarJWT], postLicenciasMedicasMasiva)

export default router;