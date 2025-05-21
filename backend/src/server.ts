// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDatabase } from './models'; // Import the database initialization function
import logger from './config/logger';
import { requestLogger } from './middleware/requestLogger.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';

// // Routes
// import authRoutes from './routes/authRoutes';
// import queueRoutes from './routes/queueRoutes';
// import paymentRoutes from './routes/paymentRoutes';
// import locationRoutes from './routes/locationRoutes';
// import serviceRoutes from './routes/serviceRoutes';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLogger);

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/queue', queueRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/services', serviceRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Barber Shop Queue API' });
});

// Error handler
app.use(errorHandler);

const startServer = async () => {
    try {
        await initializeDatabase(); // Initialize the database before starting the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start the server:', error);
    }
};

startServer();