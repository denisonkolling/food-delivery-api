import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

    @ApiProperty()
    firstName!: string;

    @ApiProperty()
    lastName!: string;

    @ApiProperty()
    address!: string;

    @ApiProperty()
    phoneNumber!: string;

    @ApiProperty()
    userId!: number;
}
