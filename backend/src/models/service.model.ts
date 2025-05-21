// src/models/Service.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db';

interface ServiceAttributes {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    locationId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ServiceInput extends Optional<ServiceAttributes, 'id'> { }
export interface ServiceOutput extends Required<ServiceAttributes> { }

class Service extends Model<ServiceAttributes, ServiceInput> implements ServiceAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public duration!: number;
    public price!: number;
    public locationId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Service.init(
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
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                duration: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 5,
                    },
                },
                price: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    validate: {
                        min: 0,
                    },
                },
                locationId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Service',
                tableName: 'services',
                timestamps: true,
            }
        );
    }
}

Service.initModel(sequelize);

export default Service;