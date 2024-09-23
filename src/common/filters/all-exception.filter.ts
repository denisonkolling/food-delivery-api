import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException
            ? exception.getResponse()
            : { message: 'Internal server error' };

        const message = typeof exceptionResponse === 'object' && exceptionResponse.hasOwnProperty('message')
            ? (exceptionResponse as any).message
            : exception.message;

        response.status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                error: exception.message || 'Internal server error',
                details: Array.isArray(message) ? message : [message],
            });
    }
}