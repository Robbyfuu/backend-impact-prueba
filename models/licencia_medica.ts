import { DataTypes,Model } from "sequelize";
import db from "../db/connection.js";

class LicenciaMedica extends Model {
   declare id: number;
   declare fecha_inicio: Date;
   declare fecha_fin: Date;
   declare cant_dias: number;
   declare ficha: number;
   declare fecha_recepcion: Date;
   declare doctor: string;
   declare doctor_especialidad: string;
   declare doctor_rut: string;
   declare estado_licencia: boolean;
}

LicenciaMedica.init ( {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cant_dias: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ficha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'trabajador',
            key: 'ficha'
        },
        unique: true
    },
    fecha_recepcion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    doctor: {
        type: DataTypes.STRING,
        
    },
    doctor_especialidad: {
        type: DataTypes.STRING,
    },
    doctor_rut:{
        type: DataTypes.STRING,
    },
    estado_licencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
}},{
    timestamps: true,
    tableName: 'licencias_medicas',
    sequelize: db
});

export default LicenciaMedica;