import { Request, Response } from "express";
import Trabajador from "../models/trabajador.js";

import { logger } from "../utils/logger.js";

export const getTrabajadores = async (req: Request, res: Response) => {
  const trabajadores = await Trabajador.findAll();
  res.json({ ok: true, trabajadores });
};
export const getTrabajadoresActivos = async (req: Request, res: Response) => {
  try {
    const trabajadores = await Trabajador.findAll();
    res.status(201).json({ ok: true, trabajadores });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const getTrabajador = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (!trabajador) {
            return res.status(404).json({
                msg: 'No existe un trabajador con el id ' + id
            });
        }
        res.json({ ok: true, trabajador });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
};

export const postTrabajador = async (req: Request, res: Response) => {
  const { body } = req;
  try {

    Trabajador.sync();
    const trabajador = new Trabajador(body);
    await trabajador.save();
    res.status(201).json({ ok: true, trabajador });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
//carga masiva de trabajadores
export const postTrabajadores = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const trabajadores = await Trabajador.bulkCreate(body.colaboradores);
    res.status(201).json({ ok: true, trabajadores });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const putTrabajador = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const trabajador = await Trabajador.findByPk(id);
    if (!trabajador) {
      return res.status(404).json({
        ok: false,
        msg: `No existe un trabajador con el id ${id}`,
      });
    }
    await trabajador.update(body);
    res.json({ ok: true, trabajador });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const deleteTrabajador = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trabajador = await Trabajador.findByPk(id);
  if (!trabajador) {
    return res.status(404).json({
      ok: false,
      msg: `No existe un trabajador con el id ${id}`,
    });
  }
  await trabajador.destroy();
//   await trabajador.update({ estado: false });
  res.json({ ok: true, trabajador });
};
