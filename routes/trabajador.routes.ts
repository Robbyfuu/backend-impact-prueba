import { Router } from "express";


import { validarJWT } from "./../middlewares/validar-jwt.js";
import {
  getTrabajador,
  getTrabajadoresActivos,
  getTrabajadores,
  postTrabajador,
  putTrabajador,
  deleteTrabajador,
  postTrabajadores
} from "../controllers/trabadores.js";

const router = Router();

router.get("/", [validarJWT], getTrabajadores);
router.get("/activos", [validarJWT], getTrabajadoresActivos);
router.get("/:id", [validarJWT], getTrabajador);
router.post("/", [validarJWT], postTrabajador);
router.post("/masivo/masivo", postTrabajadores);
router.put("/:id", [validarJWT], putTrabajador);
router.delete("/:id", [validarJWT], deleteTrabajador);

export default router;
