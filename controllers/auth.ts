import { IJwtPayload } from './../interfaces/jwt';

import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import { transporter } from "./../helpers/mailer.js";
import { generarJWT } from "../helpers/generar-jwt.js";
import { logger } from "../utils/logger.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
    logger.info("Login correcto", usuario);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const validarToken = async (req: any, res: Response) => {
  const userId = req.usuario.id;
  const token = await generarJWT(userId);
  const usuario = await Usuario.findByPk(userId);
  res.json({
    ok: true,
    usuario,
    token,
  });
};
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el email ${email}`,
        ok: false,
      });
    }
    const token = await generarJWT(usuario.id);
    const html = `
            <h1>Recuperar contraseña</h1>
            <p>Para recuperar la contraseña haga click en el siguiente enlace</p>
            <a href="https://tsm-admin.web.app/reset-password?${token}">Recuperar contraseña</a>
        `;
    const mailOptions = {
      from: "TSM Admin <tsm.finiquitos@gmail.com>",
      to: email,
      subject: "Recuperar contraseña",
      html,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          msg: "Error al enviar el correo",
          ok: false,
        });
      }
      res.json({
        msg: "Correo enviado",
        usuario,
        ok: true,
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      msg: "Error al enviar el correo",
      ok: false,
    });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const secret = process.env.SECRETORPRIVATEKEY as string;
  try {
    const { uid } = jwt.verify(token, secret) as IJwtPayload;
    const usuario = await Usuario.findByPk(uid);
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el token ${token}`,
        ok: false,
      });
    }
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.json({
      msg: "Contraseña actualizada",
      usuario,
      ok: true,
    });
  } catch (error) {
    logger.info(error);
    res.status(500).json({
      msg: "Error al actualizar la contraseña",
      ok: false,
    });
  }
};
export const validateCaptcha = async (req: Request, res: Response) => {

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`;
    try {
        const resp = await fetch(url);
        const data = await resp.json(); 
        res.json({
            ok: true,
            data
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}