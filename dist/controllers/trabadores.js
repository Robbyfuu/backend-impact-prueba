import Trabajador from '../models/trabajador.js';
import { logger } from '../utils/logger.js';
export const getTrabajadores = async (req, res) => {
    const trabajadores = await Trabajador.findAll();
    res.json({ ok: true, trabajadores });
};
export const getTrabajadoresActivos = async (req, res) => {
    try {
        const trabajadores = await Trabajador.findAll({
            where: {
                estado: true
            }
        });
        res.status(201).json({ ok: true, trabajadores });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
export const getTrabajador = async (req, res) => {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    if (trabajador) {
        if (trabajador.estado === true) {
            res.json({ ok: true, trabajador });
        }
        else {
            res.status(204).json({
                ok: false,
                msg: `El trabajador con la ficha ${id} esta desvinculado`
            });
        }
    }
    else {
        res.status(404).json({
            ok: false,
            msg: `No existe un trabajador con el id ${id}`
        });
    }
};
export const postTrabajador = async (req, res) => {
    const { body } = req;
    try {
        const existeFicha = await Trabajador.findOne({
            where: {
                ficha: body.ficha
            }
        });
        const existeRut = await Trabajador.findOne({
            where: {
                rut: body.rut,
                estado: true
            }
        });
        if (existeFicha) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un trabajador con la ficha ' + body.ficha
            });
        }
        if (existeRut) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un trabajador activo con el rut ' + body.rut
            });
        }
        const trabajador = new Trabajador(body);
        await trabajador.save();
        res.status(201).json({ ok: true, trabajador });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
//carga masiva de trabajadores
export const postTrabajadores = async (req, res) => {
    const { body } = req;
    try {
        const trabajadores = await Trabajador.bulkCreate(body.colaboradores);
        res.status(201).json({ ok: true, trabajadores });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
export const putTrabajador = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const trabajador = await Trabajador.findByPk(id);
        if (!trabajador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un trabajador con el id ${id}`
            });
        }
        await trabajador.update(body);
        res.json({ ok: true, trabajador });
    }
    catch (error) {
        logger.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
export const deleteTrabajador = async (req, res) => {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    if (!trabajador) {
        return res.status(404).json({
            ok: false,
            msg: `No existe un trabajador con el id ${id}`
        });
    }
    await trabajador.update({ estado: false });
    res.json({ ok: true, trabajador });
};
