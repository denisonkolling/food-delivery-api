import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderCancellationException extends HttpException {
    constructor() {
        super(
            'The order cannot be cancelled because it has already been completed or cancelled. Please contact support if you need further assistance.',
            HttpStatus.BAD_REQUEST
        );
    }
}