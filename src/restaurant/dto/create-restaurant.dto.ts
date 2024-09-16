import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {

    @ApiProperty({
        description: 'ID do usuário que será associado ao restaurante. Deve corresponder ao ID de um usuário existente.',
        example: 1,
    })
    userId!: number;

    @ApiProperty({
        description: 'Nome do restaurante como será exibido e registrado no sistema.',
        example: 'Satoshi Sushi'
    })
    name!: string;

    @ApiProperty({
        description: 'Tipo de culinária do restaurante, utilizado para categorizar o restaurante em pesquisas.',
        example: 'Japanese'
    })
    cuisineType!: string;

    @ApiProperty({
        description: 'Endereço completo do restaurante, incluindo rua, número, bairro, cidade e estado. Deve ser um endereço válido.',
        example: '123 Rua do Sushi, Bairro Japonês, Cidade Sushi, SP'
    })
    address!: string;

    @ApiProperty({
        description: 'Número de telefone do restaurante. Deve ser composto apenas por dígitos, sem caracteres especiais.',
        example: '55989209082'
    })
    phoneNumber!: string;
}