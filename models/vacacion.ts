import { DataTypes, Model } from "sequelize";
import db from "../db/connection.js";

class Vacaciones extends Model {
    declare id: number;
    declare ficha: number;
    declare fecha_inicio: Date;
    declare fecha_fin: Date;
    declare cant_dias_corridos: number;
    declare cant_dias_habiles: number;
/*     tipo_vacaciones: string;
    solicitado: string; */
    declare estado_vacaciones: boolean;
}

Vacaciones.init ( {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ficha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'trabajador',
            key: 'ficha'
        }
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cant_dias_corridos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cant_dias_habiles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
/*     tipo_vacaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },
    solicitado: {
        type: DataTypes.STRING,
        allowNull: false
    }, */
    estado_vacaciones: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'vacaciones',
    timestamps: true,
    sequelize: db
});

export default Vacaciones;