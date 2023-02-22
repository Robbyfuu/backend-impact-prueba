import express from 'express';
import userRoutes from '../routes/usuario.routes.js';
import authRoutes from '../routes/auth.routes.js';
import trabajadorRoutes from '../routes/trabajador.routes.js';
import sueldoRoutes from '../routes/sueldo.routes.js';
import egresoRoutes from '../routes/egresos.routes.js';
import licenciaRoutes from '../routes/licencias_medicas.routes.js';
import vacacionesRoutes from '../routes/vacacion.routes.js';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import db from '../db/connection.js';
import { transporter } from './../helpers/mailer.js';
import { logger, morganStream } from '../utils/logger.js';
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            trabajador: '/api/trabajador',
            sueldo: '/api/sueldo',
            egresos: '/api/egresos',
            licencias_medicas: '/api/licencias',
            vacaciones: '/api/vacaciones'
        };
        this.app = express();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.mailerConnection();
    }
    async dbConnection() {
        try {
            await db.authenticate();
            logger.info('Database online');
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async mailerConnection() {
        try {
            transporter.verify();
            logger.info('Mailer online');
        }
        catch (error) {
            throw new Error(error);
        }
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        //helmet
        this.app.use(helmet());
        // Lectura del body
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }));
        //morgan
        this.app.use(morgan('tiny', { stream: morganStream }));
        // Carpeta pública
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.trabajador, trabajadorRoutes);
        this.app.use(this.apiPaths.sueldo, sueldoRoutes);
        this.app.use(this.apiPaths.egresos, egresoRoutes);
        this.app.use(this.apiPaths.licencias_medicas, licenciaRoutes);
        this.app.use(this.apiPaths.vacaciones, vacacionesRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            logger.info('Servidor corriendo en puerto ' + this.port);
        });
    }
}
export default Server;
