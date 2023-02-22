import { Request, Response } from "express";
import LicenciaMedica from "../models/licencia_medica.js";
import Trabajador from "../models/trabajador.js";
import { logger } from "../utils/logger.js";
import db from "../db/connection.js";
import { query } from "../interfaces/query.js";

export const getLicenciasMedicas = async (req: Request, res: Response) => {
  const licenciasMedicas = await LicenciaMedica.findAll({
    include: { model: Trabajador },
  });
  res.json({ ok: true, licenciasMedicas });
};

export const getLicenciaMedicaTrabajador = async (
  req: Request,
  res: Response
) => {
  const id  = req.query.ficha;
  try {
    const trabajador = await LicenciaMedica.findAll({
      where: {
        ficha: id,
      },
      include: { model: Trabajador },
    });
    
    if (trabajador[0]?.dataValues) {
      console.log(trabajador[0]?.dataValues)  
    
      res.json({ ok: true, licenciaMedica: trabajador });
    } else {
      res.status(404).json({
        msg: `No existe una licencia medica con el id ${id}`,
        ok: false,
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};

export const getLicenciasMedicasTerminadas = async ( req: Request, res: Response ) => {
  try {
    const licenciasMedicas = await LicenciaMedica.findAll({
      where: {
        estado_licencia: false,
      },
      include: { model: Trabajador },
    });
    res.json({ ok: true, licenciasMedicas });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const getLicenciasMedicasActivas = async (
  req: Request,
  res: Response
) => {
  try {
    const licenciasMedicas = await LicenciaMedica.findAll({
      where: {
        estado_licencia: true,
      },
      include: { model: Trabajador },
    });
    res.json({ ok: true, licenciasMedicas });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const postLicenciaMedica = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existeTrabajador = await Trabajador.findByPk(body.ficha);
    if (!existeTrabajador) {
      return res.status(400).json({
        msg: `No existe un colaborador con la ficha ${body.ficha}`,
        ok: false,
      });
    }
    if (!existeTrabajador.estado) {
      return res.status(400).json({
        msg: `El trabajador con la ficha ${body.ficha} se encuentra desactivado`,
        ok: false,
      });
    }
    const licenciaMedica = new LicenciaMedica(body);
    await licenciaMedica.save();
    const licenciaMedicaDB = await LicenciaMedica.findByPk(licenciaMedica.id, {
      include: { model: Trabajador },
    });
    res.status(201).json({ ok: true, licenciaMedica: licenciaMedicaDB });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const putLicenciaMedica = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const licenciaMedica = await LicenciaMedica.findByPk(id);
    if (!licenciaMedica) {
      return res.status(404).json({
        msg: `No existe una licencia medica con el id ${id}`,
        ok: false,
      });
    }
    if (licenciaMedica.ficha != body.ficha) {
      return res.status(400).json({
        msg: `No se puede cambiar la ficha del trabajador, intente eliminando el registro de la licencia y creando uno nuevo`,
        ok:false
      });
    }
    if(!licenciaMedica.estado_licencia){
      return res.status(400).json({
        msg: `No se puede modificar una licencia medica que se encuentra terminada, contacte a soporte`,
        ok:false
      });
    }
    await licenciaMedica.update(body);
    const licenciaMedicaDB = await LicenciaMedica.findByPk(id, {
      include: { model: Trabajador },
    });
    res.json({ ok: true, licenciaMedica: licenciaMedicaDB });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const deleteLicenciaMedica = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const licenciaMedica = await LicenciaMedica.findByPk(id);
    if (!licenciaMedica) {
      return res.status(404).json({
        msg: `No existe una licencia medica con el id ${id}`,
        ok: false,
      });
    }
    if(!licenciaMedica.estado_licencia){
      return res.status(400).json({
        msg: `La licencia medica ya se encuentra terminada`,
        ok:false
      });
    }
    await licenciaMedica.update({ estado_licencia: false });
    const licenciaMedicaDB = await LicenciaMedica.findByPk(id, {
      include: { model: Trabajador },
    });
    res.json({ ok: true, licenciaMedica: licenciaMedicaDB });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
export const putDesactivarLicenciaMedica = async (
  req: Request,
  res: Response
) => {
  
  try {
    const licenciaMedica = await db.query(`UPDATE licencias_medicas SET estado_licencia = FALSE WHERE fecha_fin < CURRENT_DATE`) as query[];
    
   
    if (!licenciaMedica) {
      return res.status(404).json({
        msg: `No se realizo el update`,
        licenciaMedica: licenciaMedica,
        // ok: false,
      });
    }

    res.json({ ok: true, licenciaMedica: licenciaMedica[0].info, msg: "Se realizo el update" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};

//carga masiva de licencias medicas
export const postLicenciasMedicasMasiva = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const licenciasMedicas = await LicenciaMedica.bulkCreate(body);
    res.status(201).json({ ok: true, licenciasMedicas });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      ok: false,
    });
  }
};
