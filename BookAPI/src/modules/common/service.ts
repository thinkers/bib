import { Response } from 'express';
import { response_status_codes } from './model';

export function successResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: 'success',
        data
    });
}

export function failureResponse(message: string, data: any, res: Response) {
    res.status(response_status_codes.success).json({
        status: 'error',
        message: message,
        data
    });
}

export function insufficientParameters(res: Response) {
    res.status(response_status_codes.bad_request).json({
        status: 'error',
        message: 'Insufficient parameters',
        data: {}
    });
}

