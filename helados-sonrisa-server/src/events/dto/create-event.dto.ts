import { IsEnum, IsMongoId, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
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

  @IsString({ message: "La hora del evento debe ser texto" })
  @IsNotEmpty({ message: "La hora del evento es obligatoria" })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {message: "La hora debe tener un formato válido de 24 horas (HH:mm)"})
  eventTime!: string;

  @IsString({ message: "La fecha debe ser texto" })
  @IsNotEmpty({ message: "La fecha es obligatoria" })
  initDate!: string;

  @IsString({ message: "La ubicación debe ser texto" })
  @IsNotEmpty({ message: "La ubicación es obligatoria" })
  location!: string;

  @IsEnum(EventType, { message: "El tipo de evento no es válido" })
  @IsNotEmpty({ message: "El tipo de evento es obligatorio" })
  eventType!: EventType;

  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @IsMongoId({ message: "El ID del usuario no es válido" })
  user?: string;
}