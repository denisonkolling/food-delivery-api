import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

@Catch(UniqueConstraintViolationException)
export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: UniqueConstraintViolationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message =
      exception.message || 'An error occurred while saving customer data';

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: 'An error occurred while saving customer data',
      error: 'Conflict',
      details: message,
    });
  }
}
