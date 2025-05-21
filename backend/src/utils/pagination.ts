// src/utils/pagination.ts
import { Request } from 'express';

export interface PaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        total: number;
        currentPage: number;
        totalPages: number;
        limit: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}

export const getPaginationFromRequest = (req: Request): PaginationOptions => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'DESC';

    return { page, limit, sortBy, sortOrder };
};

export const getPagination = (options: PaginationOptions) => {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    const offset = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'DESC';

    return {
        limit,
        offset,
        page,
        sortBy,
        sortOrder,
    };
};

export const getPaginatedResult = <T>(data: T[], total: number, options: PaginationOptions): PaginatedResult<T> => {
    const { page = 1, limit = 10 } = options;
    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            total,
            currentPage: page,
            totalPages,
            limit,
            hasNext: page < totalPages,
            hasPrevious: page > 1,
        },
    };
};