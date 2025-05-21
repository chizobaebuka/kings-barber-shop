// src/models/User.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db';

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'customer' | 'staff' | 'admin';
    locationId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public role!: 'customer' | 'staff' | 'admin';
    public locationId?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: () => uuidv4(),
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                role: {
                    type: DataTypes.ENUM('customer', 'staff', 'admin'),
                    allowNull: false,
                    defaultValue: 'customer',
                },
                locationId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                timestamps: true,
            }
        );
    }
}

export default User;