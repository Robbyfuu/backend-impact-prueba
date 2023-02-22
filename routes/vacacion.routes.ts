import { Router } from "express";


import { validarJWT } from './../middlewares/validar-jwt.js';
import {
  getVacaciones,
  getVacacionesTrabajador,
  postVacaciones,
  putVacaciones,
  deleteVacaciones,
  getVacacionesActivas,
  getVacacionesTerminadas,
  postVacacionesMasivo,
} from "../controllers/vacaciones.js";

const router = Router();

router.get("/",[validarJWT], getVacaciones);
router.get("/tsm/activas", [validarJWT],getVacacionesActivas);
router.get("/tsm/terminadas",[validarJWT], getVacacionesTerminadas);
router.get("/:id",[validarJWT], getVacacionesTrabajador);
router.post("/", [validarJWT],postVacaciones);
router.put("/:id",[validarJWT], putVacaciones);
router.delete("/:id",[validarJWT], deleteVacaciones);
router.post("/carga/masiva",[validarJWT], postVacacionesMasivo);

export default router;