// src/models/Queue.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db';

interface QueueAttributes {
    id: string;
    customerId: string;
    serviceId: string;
    barberId?: string;
    locationId: string;
    status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
    estimatedWaitTime: number;
    startTime?: Date;
    endTime?: Date;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface QueueInput extends Optional<QueueAttributes, 'id' | 'estimatedWaitTime' | 'status'> { }
export interface QueueOutput extends Required<QueueAttributes> { }

class Queue extends Model<QueueAttributes, QueueInput> implements QueueAttributes {
    public id!: string;
    public customerId!: string;
    public serviceId!: string;
    public barberId?: string;
    public locationId!: string;
    public status!: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
    public estimatedWaitTime!: number;
    public startTime?: Date;
    public endTime?: Date;
    public notes?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Queue.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: () => uuidv4(),
                    primaryKey: true,
                },
                customerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                serviceId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                barberId: {
                    type: DataTypes.UUID,
                    allowNull: true,
                },
                locationId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('waiting', 'in-progress', 'completed', 'cancelled'),
                    allowNull: false,
                    defaultValue: 'waiting',
                },
                estimatedWaitTime: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                startTime: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                endTime: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                notes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Queue',
                tableName: 'queues',
                timestamps: true,
            }
        );
    }
}

export default Queue;