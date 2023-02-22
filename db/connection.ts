import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger.js';


const MYSQLDATABASE = process.env.MYSQLDATABASE||'impactDB';
const MYSQLUSER = process.env.MYSQLUSER||'root';
const MYSQLPASSWORD = process.env.MYSQLPASSWORD||'password';
const MYSQLHOST = process.env.MYSQLHOST||'localhost';
const MYSQLPORT = process.env.MYSQLPORT||'3306';

logger.info(process.env.MYSQLDATABASE?'prod':'dev')
const db = new Sequelize(MYSQLDATABASE,MYSQLUSER,MYSQLPASSWORD,{
    host:MYSQLHOST,
    port:parseInt(MYSQLPORT),
    dialect:'mysql',
    logging:false,
    /* logging:msg => logger.debug(msg), */
/*     dialectOptions:{
        require:true,
    } */

});

export default db;
