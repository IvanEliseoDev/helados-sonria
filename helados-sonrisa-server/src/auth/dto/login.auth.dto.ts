import { IsEmail, IsNotEmpty } from "class-validator"

export class loginDto {

    @IsNotEmpty({message: "El correo no debe de ir vacio"})
    @IsEmail({}, { message: "El correo debe tener un formato válido" })
    email!: string

    @IsNotEmpty({message: "La contraseña no debe de ir vacia"})
    password!: string
}