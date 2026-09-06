import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no debe ir vacío' })
    @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
    name!: string;

    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo es obligatorio' })
    type!: string;

    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    category!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    description!: string;

    @IsOptional()
    @IsArray({ message: 'Las presentaciones deben ser un arreglo de elementos' })
    @IsString({ each: true, message: 'Cada presentación debe ser una cadena de texto' })
    presentations?: string[];

    @IsString({message: "El estado debe ser una cadena de texto"})
    status!: string
}