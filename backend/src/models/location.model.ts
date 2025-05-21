// src/models/Location.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db';

interface LocationAttributes {
    id: string;
    name: string;
    address: string;
    phone: string;
    openingHours: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LocationInput extends Optional<LocationAttributes, 'id'> { }
export interface LocationOutput extends Required<LocationAttributes> { }

class Location extends Model<LocationAttributes, LocationInput> implements LocationAttributes {
    public id!: string;
    public name!: string;
    public address!: string;
    public phone!: string;
    public openingHours!: any;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Location.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: () => uuidv4(),
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                openingHours: {
                    type: DataTypes.JSONB,
                    allowNull: false,
                    defaultValue: [],
                },
            },
            {
                sequelize,
                modelName: 'Location',
                tableName: 'locations',
                timestamps: true,
            }
        );
    }
}

export default Location;