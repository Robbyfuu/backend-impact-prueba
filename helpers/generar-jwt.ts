import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";

export const generarJWT = (uid: Number) => {
    const seed : string = process.env.SECRETORPRIVATEKEY as string;
    
    return new Promise((resolve, reject) => {
        const payload = { uid };
    
        jwt.sign(
            payload,
            seed,{
                expiresIn: '7d'
            },(err, token) => {
                if (err) {
                    logger.info(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            })
    })
}