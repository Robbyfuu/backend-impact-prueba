import { DataTypes, Model } from 'sequelize';

import db from '../db/connection.js';

class Usuario extends Model {
    declare nombre: string;
    declare email: string;
    declare estado: boolean;
    declare password: string;
    declare role: string;
    declare id : number;
}
Usuario.init ( {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: {
        type: DataTypes.STRING,
        
    },
    role:{
        type: DataTypes.ENUM('ADMIN_ROLE', 'USER_ROLE'),
        defaultValue: 'USER_ROLE'
    }
},{
    tableName: 'usuarios',
    timestamps: true,
    sequelize: db
}
);



export default Usuario ;