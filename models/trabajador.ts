import { DataTypes, Model } from "sequelize";

import db from "../db/connection.js";



class Trabajador extends Model {
  declare id: number;
  declare apellido_paterno: string;
  declare nombre: string;
  declare apellido_materno: string;
  declare telefono: string;
  declare email: string;

}
Trabajador.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: true,
    }
  },
  {
    tableName: "trabajador",
    timestamps: true,
    sequelize: db,
  }
);



export default Trabajador;
