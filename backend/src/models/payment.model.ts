// src/models/Payment.ts
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/db';

interface PaymentAttributes {
    id: string;
    queueId: string;
    customerId: string;
    amount: number;
    method: 'cash' | 'credit_card' | 'debit_card' | 'mobile_payment';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaymentInput extends Optional<PaymentAttributes, 'id' | 'status'> { }
export interface PaymentOutput extends Required<PaymentAttributes> { }

class Payment extends Model<PaymentAttributes, PaymentInput> implements PaymentAttributes {
    public id!: string;
    public queueId!: string;
    public customerId!: string;
    public amount!: number;
    public method!: 'cash' | 'credit_card' | 'debit_card' | 'mobile_payment';
    public status!: 'pending' | 'completed' | 'failed' | 'refunded';
    public transactionId?: string;
    public notes?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Payment.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: () => uuidv4(),
                    primaryKey: true,
                },
                queueId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    unique: true,
                },
                customerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    validate: {
                        min: 0,
                    },
                },
                method: {
                    type: DataTypes.ENUM('cash', 'credit_card', 'debit_card', 'mobile_payment'),
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
                    allowNull: false,
                    defaultValue: 'pending',
                },
                transactionId: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                notes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'Payment',
                tableName: 'payments',
                timestamps: true,
            }
        );
    }
}

export default Payment;