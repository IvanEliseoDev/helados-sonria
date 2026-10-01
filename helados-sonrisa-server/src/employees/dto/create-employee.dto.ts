import { IsString, IsNotEmpty, IsEmail, MinLength, IsEmpty } from "class-validator";

export class CreateEmployeeDto {
    @IsEmpty({message: "El id no debe de ir"})
    id?: string
    
    @IsString({ message: "El nombre debe ser texto" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    firstName!: string;

    @IsString({ message: "El apellido debe ser texto" })
    @IsNotEmpty({ message: "El apellido es obligatorio" })
    lastName!: string;

    @IsEmail({}, { message: "El correo debe tener un formato válido" })
    @IsNotEmpty({ message: "El* correo es obligatorio" })
    email!: string;

    @IsString({ message: "La contraseña debe ser texto" })
    @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    password!: string;
}
