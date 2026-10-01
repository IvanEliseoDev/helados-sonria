import { OmitType } from '@nestjs/mapped-types'; // o '@nestjs/swagger' dependiendo de tu proyecto
import { CreateEventDto } from './create-event.dto';

export class CreateReserveEventDto extends OmitType(CreateEventDto, ['user'] as const) {}