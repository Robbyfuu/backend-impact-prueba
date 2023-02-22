import { DataTypes, Model } from "sequelize";
import db from "../db/connection.js";
class Vacaciones extends Model {
}
Vacaciones.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ficha: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
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
