import { Request, Response } from "express";

import Egreso from "../models/egresos.js";
import Trabajador from "../models/trabajador.js";
import { logger } from "../utils/logger.js";

export const getEgresos = async (req: Request, res: Response) => {
  const egresos = await Egreso.findAll({ include: { model: Trabajador } });
  res.json({ egresos });
};
export const getEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const egreso = await Egreso.findOne({
    where: { ficha: id },
    include: { model: Trabajador },
  });
  if (egreso) {
    res.json({ ok:true,egreso });
  } else {
    res.status(404).json({
      msg: `El Trabajador con Numero de Ficha: ${id} no se encuentra despedido`,
      ok:false
    });
  }
};
export const postEgreso = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existeFicha = await Egreso.findOne({
      where: {
        ficha: body.ficha,
      },
    });
    if (existeFicha) {
      return res.status(400).json({
        msg: `Trabajador ${body.ficha} ya se encuentra despedido`,
        ok:false
      });
    }
    const existeTrabajador = await Trabajador.findByPk(body.ficha);
    if (!existeTrabajador) {
      return res.status(400).json({
        msg: `No existe un trabajador con la ficha ${body.ficha}`,
        ok:false
      });
    }

    const egreso = new Egreso(body);
    await egreso.save();
    const trabajador = await Trabajador.findByPk(body.ficha);
    if (!trabajador) {
      return res.status(404).json({
        msg: `No existe un trabajador con la ficha ${body.ficha}`,
        ok:false
      });
    }
    await trabajador.update({ estado: false }) ;
    const egresoDB = await Egreso.findByPk(egreso.id, {
      include: { model: Trabajador },
    });
    res.status(201).json({ ok:true, egreso: egresoDB });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok:false
    });
  }
};
//carga masiva de egresos
export const postEgresos = async(req:Request,res:Response)=>{
  const {body} = req;
  try {
      const trabajadores = await Egreso.bulkCreate(body.desvinculaciones);
      res.status(201).json({ok:true,trabajadores});
  } catch (error) {
      logger.error(error);
      res.status(500).json({
          ok:false,
          msg:'Hable con el administrador'
      })
  }
}


export const putEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const egreso = await Egreso.findByPk(id, {
      include: { model: Trabajador },
    });
    if (!egreso) {
      return res.status(404).json({
        msg: `No existe un egreso con el id ${id}`,
        ok:false
      });
    }
    if (egreso.ficha != body.ficha) {
      return res.status(400).json({
        msg: `No se puede cambiar la ficha del trabajador, intente eliminando el registro de egreso y creando uno nuevo`,
        ok:false
      });
    }
    await egreso.update(body);
    res.json({ok:true, egreso });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok:false
    });
  }
};
export const deleteEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const egreso = await Egreso.findOne({
    where: {
      ficha: id,
    },
    include: { model: Trabajador },
  });
  if (!egreso) {
    return res.status(404).json({
      msg: `El Trabajador con Numero de Ficha: ${id} no se encuentra despedido`,
      ok:false
    });
  }
  const trabajador = await Trabajador.findByPk(egreso.ficha);
  if (!trabajador) {
    return res.status(404).json({
      msg: `No existe un trabajador con la ficha ${id}`,
      ok:false
    });
  }
  await trabajador.update({ estado: true });
  const egresoResult = await Egreso.findOne({
    where: {
      ficha: id,
    },
    include: { model: Trabajador },
  });
  await egreso.destroy();
  res.json({ ok:true, egresoResult });
};
