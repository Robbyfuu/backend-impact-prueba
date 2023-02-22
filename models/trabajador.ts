import { DataTypes, Model } from "sequelize";

import db from "../db/connection.js";
import Egresos from "./egresos.js";
import LicenciaMedica from "./licencia_medica.js";
import Sueldo from "./sueldos.js";
import Vacaciones from "./vacacion.js";

class Trabajador extends Model {
  declare ficha: number;
  declare rut: string;
  declare nombre_completo: string;
  declare fecha_nacimiento: Date;
  declare nacionalidad: string;
  declare estado: boolean;
  declare sexo: string;
  declare cargo: string;
  declare fecha_ingreso: Date;
  declare gerencia: string;
  declare tipo_contrato: string;
  declare calificacion_trabajador: string;
  declare tipo_estructura: string;
  declare base: string;
  declare centro_costo: string;
  declare jefatura: string;
}
Trabajador.init(
  {
    ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nacionalidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sexo: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
    },
    gerencia: {
      type: DataTypes.STRING,
    },
    tipo_contrato: {
      type: DataTypes.STRING,
    },
    calificacion_trabajador: {
      type: DataTypes.ENUM("Conductor", "Soporte"),
    },
    tipo_estructura: {
      type: DataTypes.ENUM("Fija", "Variable"),
      allowNull: false,
    },
    base: {
      type: DataTypes.STRING,
    },
    centro_costo: {
      type: DataTypes.STRING,
    },
    jefatura: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "trabajador",
    timestamps: true,
    sequelize: db,
  }
);

Sueldo.belongsTo(Trabajador, { foreignKey: "ficha", targetKey: "ficha" });
Trabajador.hasMany(Sueldo, { foreignKey: "ficha" });

Trabajador.hasOne(Egresos, { foreignKey: "ficha" });
Egresos.belongsTo(Trabajador, { foreignKey: "ficha", targetKey: "ficha" });

Trabajador.hasMany(LicenciaMedica, { foreignKey: "ficha" });
LicenciaMedica.belongsTo(Trabajador, {
  foreignKey: "ficha",
  targetKey: "ficha",
});

Vacaciones.belongsTo(Trabajador, { foreignKey: "ficha", targetKey: "ficha" });
Trabajador.hasMany(Vacaciones, { foreignKey: "ficha" });

export default Trabajador;
