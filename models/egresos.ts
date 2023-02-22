import { DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

class Egresos extends Model {
  declare ficha: number;
  declare id: number;
  declare fecha_desvinculacion: Date;
  declare motivo_desvinculacion: string;
}

Egresos.init(
  {
    ficha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "trabajador",
        key: "ficha",
      },
    },
    fecha_desvinculacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    motivo_desvinculacion: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "egresos",
    timestamps: true,
    sequelize: db,
  }
);

export default Egresos;
