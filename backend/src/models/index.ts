// src/models/index.ts

import { Sequelize } from 'sequelize';
import Location from "./location.model";
import Payment from "./payment.model";
import Queue from "./queue.model";
import Service from "./service.model";
import User from "./user.model";
import sequelize from '../config/db';

// Initialize models
User.initModel(sequelize);
Location.initModel(sequelize);
Payment.initModel(sequelize);
Queue.initModel(sequelize);
Service.initModel(sequelize);

// Define relationships
User.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });
Location.hasMany(User, { foreignKey: 'locationId', as: 'users' });

Service.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });
Location.hasMany(Service, { foreignKey: 'locationId', as: 'services' });

Queue.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
Queue.belongsTo(User, { foreignKey: 'barberId', as: 'barber' });
Queue.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Queue.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });

User.hasMany(Queue, { foreignKey: 'customerId', as: 'customerQueues' });
User.hasMany(Queue, { foreignKey: 'barberId', as: 'barberQueues' });
Service.hasMany(Queue, { foreignKey: 'serviceId', as: 'queues' });
Location.hasMany(Queue, { foreignKey: 'locationId', as: 'queues' });

Payment.belongsTo(Queue, { foreignKey: 'queueId', as: 'queue' });
Payment.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

Queue.hasOne(Payment, { foreignKey: 'queueId', as: 'payment' });
User.hasMany(Payment, { foreignKey: 'customerId', as: 'payments' });

export const initializeDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync models
        await sequelize.sync({ alter: true }); // Use { force: true } for development to drop and recreate tables
        console.log('Models synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export {
    sequelize,
    User,
    Location,
    Service,
    Queue,
    Payment
};