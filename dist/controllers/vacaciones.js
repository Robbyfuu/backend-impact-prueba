import { logger } from "../utils/logger.js";
import Trabajador from "../models/trabajador.js";
import Vacaciones from "../models/vacacion.js";
export const getVacaciones = async (req, res) => {
    await Vacaciones.sync({ alter: true });
    const vacaciones = await Vacaciones.findAll({
        include: { model: Trabajador },
    });
    res.json({ ok: true, vacaciones });
};
export const getVacacionesTrabajador = async (req, res) => {
    const id = req.query.ficha;
    try {
        const trabajador = await Vacaciones.findAll({
            where: {
                ficha: id,
            },
            include: { model: Trabajador },
        });
        if (trabajador[0]?.dataValues) {
            res.json({ ok: true, vacaciones: trabajador });
        }
        else {
            res.status(404).json({
                msg: `No existe vacaciones para el colaborador con ficha ${id}`,
                ok: false,
            });
        }
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
export const getVacacionesTerminadas = async (req, res) => {
    try {
        const vacaciones = await Vacaciones.findAll({
            where: {
                estado_vacaciones: false,
            },
            include: { model: Trabajador },
        });
        res.json({ ok: true, vacaciones });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
// vacaciones activas
export const getVacacionesActivas = async (req, res) => {
    try {
        const vacaciones = await Vacaciones.findAll({
            where: {
                estado_vacaciones: true,
            },
            include: { model: Trabajador },
        });
        res.json({ ok: true, vacaciones });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
//crear vacacion
export const postVacaciones = async (req, res) => {
    const { body } = req;
    try {
        const trabajador = await Trabajador.findByPk(body.ficha);
        if (!trabajador) {
            return res.status(404).json({
                msg: `No existe un trabajador con la ficha ${body.ficha}`,
                ok: false,
            });
        }
        const vacacion = new Vacaciones(body);
        await vacacion.save();
        res.json({ ok: true, data: { vacacion, trabajador } });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
//actualizar vacacion
export const putVacaciones = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const vacacion = await Vacaciones.findByPk(id);
        if (!vacacion) {
            return res.status(404).json({
                msg: `No existe una vacacion con el id ${id}`,
                ok: false,
            });
        }
        await vacacion.update(body);
        res.json({ ok: true, vacacion });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
//eliminar vacacion
export const deleteVacaciones = async (req, res) => {
    const { id } = req.params;
    try {
        const vacacion = await Vacaciones.findByPk(id);
        if (!vacacion) {
            return res.status(404).json({
                msg: `No existe una vacacion con el id ${id}`,
                ok: false,
            });
        }
        await vacacion.destroy();
        res.json({ ok: true, vacacion });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
// carga masiva de vacaciones
export const postVacacionesMasivo = async (req, res) => {
    const { body } = req;
    try {
        /*         const trabajador = await Trabajador.findByPk(body.ficha);
                if (!trabajador) {
                return res.status(404).json({
                    msg: `No existe un trabajador con la ficha ${body.ficha}`,
                    ok: false,
                });
                } */
        const vacaciones = await Vacaciones.bulkCreate(body);
        res.status(201).json({ ok: true, vacaciones });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            msg: "Hable con el administrador",
            ok: false,
        });
    }
};
