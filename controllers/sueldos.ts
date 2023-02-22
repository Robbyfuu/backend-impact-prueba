import { Request, Response } from "express";
import fetch from "node-fetch";
import Sueldo from "../models/sueldos.js";
import Trabajador from "../models/trabajador.js";
import db from "../db/connection.js";
import { logger } from "../utils/logger.js";

export const getSueldos = async (req: Request, res: Response) => {
  const sueldos = await Sueldo.findAll({ include: { model: Trabajador } });
  res.json({ ok: true, sueldos });
};
export const getSueldoTrabajador = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trabajador = await Sueldo.findAll({
    where: {
      ficha: id,
    },
    include: { model: Trabajador },
  });
  if (trabajador[0]?.dataValues) {
    res.json({ ok: true, sueldo: trabajador });
  } else {
    res.status(404).json({
      msg: `No existe un sueldo con el id ${id}`,
      ok: false,
    });
  }
};
export const postSueldo = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existeFicha = await Sueldo.findOne({
      where: {
        ficha: body.ficha,
        fecha_mes: body.fecha_mes,
      },
    });
    if (existeFicha) {
      return res.status(400).json({
        msg:
          `Trabajador ${body.ficha} ya registra sueldo para el mes` +
          body.fecha_mes,
        ok: false,
      });
    }
    const existeTrabajador = await Trabajador.findByPk(body.ficha);
    if (!existeTrabajador) {
      return res.status(400).json({
        msg: `No existe un trabajador con la ficha ${body.ficha}`,
        ok: false,
      });
    }
    if (!existeTrabajador.estado) {
      return res.status(400).json({
        msg: `El trabajador con la ficha ${body.ficha} se encuentra desactivado`,
        ok: false,
      });
    }
    const sueldo = new Sueldo(body);
    await sueldo.save();
    const sueldoDB = await Sueldo.findByPk(sueldo.id, {
      include: { model: Trabajador },
    });
    res.status(201).json({ ok: true, sueldo: sueldoDB });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const putSueldo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const sueldo = await Sueldo.findByPk(id, {
      include: { model: Trabajador },
    });
    if (!sueldo) {
      return res.status(404).json({
        msg: `No existe un sueldo con el id ${id}`,
        ok: false,
      });
    }

    if (sueldo.ficha != body.ficha) {
      return res.status(400).json({
        msg: `El id ingresado corresponde a un sueldo de otro trabajador... no se puede realizar el cambio`,
        ok: false,
      });
    }
    const existeTrabajador = await Trabajador.findByPk(body.ficha);
    if (!existeTrabajador) {
      return res.status(400).json({
        msg: `No existe un trabajador con la ficha ${body.ficha}`,
        ok: false,
      });
    }
    if (!existeTrabajador.estado) {
      return res.status(400).json({
        msg: `El trabajador con la ficha ${body.ficha} se encuentra desactivado`,
        ok: false,
      });
    }

    await sueldo.update(body, { include: { model: Trabajador } });
    res.json({ ok: true, ueldo: sueldo });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const deleteSueldo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sueldo = await Sueldo.findByPk(id, { include: { model: Trabajador } });
  if (sueldo) {
    await sueldo.destroy();
    res.json({ ok: true, sueldo: sueldo });
  } else {
    res.status(404).json({
      msg: `No existe un sueldo con el id ${id}`,
      ok: false,
    });
  }
};
export const getUF = async (req: Request, res: Response) => {
  // const {mes,anio} = req.params;
  // const fecha = new Date();
  // const mesActual = fecha.getMonth()+1;
  // const anioActual = fecha.getFullYear();

  const url = "https://mindicador.cl/api";
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    res.json({ ok: true, uf: data.uf.valor });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
  // if(mesActual == mes && anioActual == anio){
  // }else{
  //     const url = `https://mindicador.cl/api/uf/${anio}/${mes}`;
  //     const resp = await fetch(url);
  //     const data = await resp.json();
  //     res.json({ok:true,uf:data.serie[0].valor});
  // }
};
export const getSalary3monthsAgo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fecha = new Date();

  fecha.setHours(0, 0, 0, 0);

  const sueldos = await db.query(
    `SELECT * from sueldos_mensuales WHERE fecha_mes >= Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH),INTERVAL day(CURRENT_DATE)-1 DAY) && ficha =${id}`
  );

  logger.info(sueldos);

  res.json({ ok: true, sueldos: sueldos[0] });
};
export const getSalarylastMonth = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fecha = new Date();

  fecha.setHours(0, 0, 0, 0);

  const sueldos = await db.query(
    `SELECT * from sueldos_mensuales WHERE fecha_mes = Date_sub( DATE_SUB(CURRENT_DATE, INTERVAL 0 MONTH),INTERVAL day(CURRENT_DATE)+0 DAY) && ficha =${id}`
  );

  logger.info(sueldos);

  res.json({ ok: true, sueldos: sueldos[0] });
};
