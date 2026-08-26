import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EventType } from "../enums/event-type.enum";

export class CreateEventDto {

  @IsString({ message: "El nombre debe ser texto" })
  @IsNotEmpty({ message: "El nombre no puede ir vacío" })
  @MinLength(5, { message: "El nombre debe tener al menos 5 caracteres" })
  name!: string;

  @IsString({ message: "La descripción debe ser texto" })
  @IsNotEmpty({ message: "La descripción no puede ir vacía" })
  @MinLength(10, { message: "La descripción debe tener al menos 10 caracteres" })
  description!: string;

  @IsString({ message: "La fecha debe ser texto" })
  @IsNotEmpty({ message: "La fecha es obligatoria" })
  initDate!: string;

  @IsString({ message: "La ubicación debe ser texto" })
  @IsNotEmpty({ message: "La ubicación es obligatoria" })
  location!: string;

  @IsEnum(EventType, { message: "El tipo de evento no es válido" })
  @IsNotEmpty({ message: "El tipo de evento es obligatorio" })
  eventType!: EventType;
}