"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const LicenciaMedica = connection_1.default.define('licencias_medicas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    cant_dias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ficha: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'trabajador',
            key: 'ficha'
        },
        unique: true
    },
    fecha_recepcion: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    doctor: {
        type: sequelize_1.DataTypes.STRING,
    },
    doctor_especialidad: {
        type: sequelize_1.DataTypes.STRING,
    },
    doctor_rut: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado_licencia: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'licencias_medicas'
});
exports.default = LicenciaMedica;
