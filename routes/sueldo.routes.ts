import { Router } from "express";

import { validarJWT } from "./../middlewares/validar-jwt.js";
import {
  getSueldos,
  getSueldoTrabajador,
  postSueldo,
  putSueldo,
  deleteSueldo,
  getUF,
  getSalary3monthsAgo,
  getSalarylastMonth,
} from "../controllers/sueldos.js";

const router = Router();

router.get("/", [validarJWT], getSueldos);
router.get("/:id", [validarJWT], getSueldoTrabajador);
router.post("/", [validarJWT], postSueldo);
router.put("/:id", [validarJWT], putSueldo);
router.delete("/:id", [validarJWT], deleteSueldo);
router.get("/uf/hoy", [validarJWT], getUF);
router.get("/salary3monthsago/:id", [validarJWT], getSalary3monthsAgo);
router.get("/salarylastmonth/:id", [validarJWT], getSalarylastMonth);

export default router;
