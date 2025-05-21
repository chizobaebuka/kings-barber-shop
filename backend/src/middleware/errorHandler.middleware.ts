// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface AppError extends Error {
    statusCode?: number;
    code?: string;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = err.statusCode ?? 500;

    // Log the error
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);

    // Sequelize unique constraint error
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        err.message = 'Duplicate field value entered';
    }

    // Sequelize validation error
    if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};