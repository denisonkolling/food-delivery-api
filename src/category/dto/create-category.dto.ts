import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Category name used to group product types',
        example: 'Italian'
    })
    name!: string;
}
