
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario.js';
import {generarJWT} from '../helpers/generar-jwt.js';
import { logger } from '../utils/logger.js';

export const getUsuarios = async( req: Request , res: Response ) => {

    const usuarios = await Usuario.findAll();

    res.json({"ok":true, usuarios });
}

export const getUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json({"ok":true,usuario});
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }


}

export const postUsuario  = async( req: Request , res: Response ) => {

    const {body} = req;

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }


        const usuario  = new Usuario (body);

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( body.password, salt );
        
        await usuario.save();

        
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
            "ok":true,

        } );
    //    await Usuario.create(body).then( response => {
    //         res.json(response);
        
    //    })


    } catch (error) {

        logger.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }



}

export const putUsuario = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk( id );
        if ( !usuario ) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update( body );

        res.json( {"ok":true,usuario} );


    } catch (error) {

        logger.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
}


export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );
    if ( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estado: false });

    // await usuario.destroy();


    res.json({"ok":true,usuario});
}

