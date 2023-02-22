import { IJwtPayload } from './../interfaces/jwt.js';
import {Response,Request} from 'express';
import jwt from 'jsonwebtoken';


import Usuario from '../models/usuario.js';

export const validarJWT = async (req: any, res: Response, next: Function) => {
    const token = req.header('x-token');
    const secret = process.env.SECRETORPRIVATEKEY as string ;
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        
        const {uid} = jwt.verify(token, secret ) as IJwtPayload;
        
        const usuario = await Usuario.findByPk(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }
        req.usuario = usuario;
        next();
    }catch{
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}