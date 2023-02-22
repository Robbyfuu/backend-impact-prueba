import { DataTypes, Model } from "sequelize";

import db from "../db/connection.js";

class Sueldo extends Model {
  declare id: number;
  declare fecha_mes: Date;
  declare sueldo_base: number;
  declare ficha: number;
  declare bono_jornada: number;
  declare bono_produccion: number;
  declare bono_gnl: number;
  declare bono_criogenico: number;
  declare bono_cumpl_programa: number;
  declare bono_present_espera: number;
  declare bono_estimulo_peddler: number;
  declare bono_asig_zona: number;
  declare bono_horas_extras: number;
  declare bono_sibelco: number;
  declare bono_mina: number;
  declare bono_casa_cambio: number;
  declare asig_colacion: number;
  declare asig_movilizacion: number;
  declare bono_especial: number;
  declare trabajo_especial: number;
  declare dif_mes_anterior_imp: number;
  declare comision_vacaciones: number;
  declare comision: number;
  declare semana_corrida: number;
  declare bono_estimulo: number;
  declare antic_bono_trimestral: number;
  declare bono_vacaciones: number;
  declare bono_cuatriestral: number;
  declare bono_anual: number;
  declare bono_descargas: number;
  declare bono_antig_gnl: number;
  declare bono_antiguedad: number;
  declare dif_mes_anterior_no_imp: number;
  declare prestamo_empresa: number;
}

Sueldo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_mes: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sueldo_base: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "trabajador",
        key: "ficha",
      },
    },
    bono_jornada: {
      type: DataTypes.INTEGER,
    },
    bono_produccion: {
      type: DataTypes.INTEGER,
    },
    bono_gnl: {
      type: DataTypes.INTEGER,
    },
    bono_criogenico: {
      type: DataTypes.INTEGER,
    },
    bono_cumpl_programa: {
      type: DataTypes.INTEGER,
    },
    bono_present_espera: {
      type: DataTypes.INTEGER,
    },
    bono_estimulo_peddler: {
      type: DataTypes.INTEGER,
    },
    bono_asig_zona: {
      type: DataTypes.INTEGER,
    },
    bono_horas_extras: {
      type: DataTypes.INTEGER,
    },
    bono_sibelco: {
      type: DataTypes.INTEGER,
    },
    bono_mina: {
      type: DataTypes.INTEGER,
    },
    bono_casa_cambio: {
      type: DataTypes.INTEGER,
    },
    asig_colacion: {
      type: DataTypes.INTEGER,
    },
    asig_movilizacion: {
      type: DataTypes.INTEGER,
    },
    bono_especial: {
      type: DataTypes.INTEGER,
    },
    trabajo_especial: {
      type: DataTypes.INTEGER,
    },
    dif_mes_anterior_imp: {
      type: DataTypes.INTEGER,
    },
    comision_vacaciones: {
      type: DataTypes.INTEGER,
    },
    comision: {
      type: DataTypes.INTEGER,
    },
    semana_corrida: {
      type: DataTypes.INTEGER,
    },
    bono_estimulo: {
      type: DataTypes.INTEGER,
    },
    antic_bono_trimestral: {
      type: DataTypes.INTEGER,
    },
    bono_vacaciones: {
      type: DataTypes.INTEGER,
    },
    bono_cuatriestral: {
      type: DataTypes.INTEGER,
    },
    bono_anual: {
      type: DataTypes.INTEGER,
    },
    bono_descargas: {
      type: DataTypes.INTEGER,
    },
    bono_antig_gnl: {
      type: DataTypes.INTEGER,
    },
    bono_antiguedad: {
      type: DataTypes.INTEGER,
    },
    dif_mes_anterior_no_imp: {
      type: DataTypes.INTEGER,
    },
    prestamo_empresa: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "sueldos_mensuales",
    timestamps: true,
    sequelize: db,
  }
);

export default Sueldo;
