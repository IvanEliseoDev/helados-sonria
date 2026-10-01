import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import { MongoError } from 'src/errors/mongoError.interface';
import { handleDBException } from 'src/utils/handle-exceptions.util';
import { CreateReserveEventDto } from './dto/create-reserve-event.dto';
import { EventStatus } from './enums/event-status.enum';

@Injectable()
export class EventsService {

  private readonly eventModel: Model<Event>

  constructor(@InjectModel(Event.name) eventModel: Model<Event>) {
    this.eventModel = eventModel;
  }

  async create(createEventDto: CreateEventDto) {
    try {
      const event = await this.eventModel.create(createEventDto);
      return new ApiResponse("Evento Creado Exitosamente", 201, event);
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`El evento ya existe en la BD ${JSON.stringify(mongoError.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo crear el evento - Revisa los logs del servidor`);
    }
  }

  async findAll() {
    const events = await this.eventModel.find();
    return new ApiResponse("Eventos obtenidos exitosamente", 200, events);
  }

  async findOne(term: string) {
    let event: Event | null = null;
    if (isValidObjectId(term)) {
      event = await this.eventModel.findById(term);
    }
    if (!event && term) {
      event = await this.eventModel.findOne({ name: term });
    }
    if (!event) throw new NotFoundException("El evento con el id, name o UUID no fue encontrado");
    return new ApiResponse("Evento obtenido exitosamente", 200, event);
  }

  // Actualización general (o puedes adaptarla si solo el dueño puede editar)
  async update(term: string, updateEventDto: UpdateEventDto) {
    try {
      if (!isValidObjectId(term)) {
        throw new BadRequestException("El ID proporcionado no es válido");
      }
      const updatedEvent = await this.eventModel.findByIdAndUpdate(term, updateEventDto, { new: true });
      if (!updatedEvent) {
        throw new NotFoundException(`El evento con ID ${term} no fue encontrado`);
      }
      return new ApiResponse("Evento actualizado exitosamente", 200, updatedEvent);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`Evento existente en la BD ${JSON.stringify(mongoError.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`No se pudo actualizar el evento - Revisa los logs del servidor`);
    }
  }

  // * UPDATE EXCLUSIVO PARA TU PROPIO EVENTO (Solo si te pertenece como usuario)
  async updateMyEvent(eventId: string, updateEventDto: UpdateEventDto, userPayload: { userId: string; email: string; role: string }) {
    try {
      if (!isValidObjectId(eventId)) {
        return new ApiResponse("El id del evento no tiene el formato correcto", 400, null);
      }

      const updatedEvent = await this.eventModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(eventId),
          user: new Types.ObjectId(userPayload.userId),
        },
        updateEventDto,
        { new: true }
      );

      if (!updatedEvent) {
        throw new NotFoundException(`El evento con ID ${eventId} no fue encontrado o no te pertenece.`);
      }

      return new ApiResponse("Tu evento ha sido actualizado exitosamente", 200, updatedEvent);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EventsService.name);
    }
  }

  async remove(term: string) {
    try {
      if (!isValidObjectId(term)) {
        throw new BadRequestException("El ID proporcionado no es válido");
      }
      const deletedEvent = await this.eventModel.findByIdAndDelete(term);
      if (!deletedEvent) {
        throw new NotFoundException(`El evento con ID ${term} no fue encontrado`);
      }
      return new ApiResponse("Evento eliminado exitosamente", 200, null);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      console.log(error);
      throw new InternalServerErrorException(`No se pudo eliminar el Evento - Revisa los server logs`);
    }
  }

  async removeAll() {
    try {
      await this.eventModel.deleteMany();
      return new ApiResponse("Eventos eliminados exitosamente", 200, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`No se lograron eliminar todos los eventos - revisa los server logs`);
    }
  }

  async insertMany(createEventDtos: CreateEventDto[]) {
    try {
      const inserted = await this.eventModel.insertMany(createEventDtos);
      return new ApiResponse("Todos los eventos han sido insertados exitosamente", 201, { count: inserted.length });
    } catch (error) {
      console.log(error);
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) throw new BadRequestException(`Evento existe en la BD ${JSON.stringify(mongoError.keyValue)}`);
      throw new InternalServerErrorException(`No se lograron insertar todos los eventos - revisa los server Logs`);
    }
  }

  async findCustomerMeEvent(userPayload: any) {
    try {
      if (!userPayload) {
        return new ApiResponse("Usuario no encontrado", 401, null);
      }

      const rawUserId = userPayload.id || userPayload.userId || userPayload.sub;

      if (!rawUserId) {
        return new ApiResponse("No se encontró el ID en el token", 401, null);
      }

      const userObjectId = new Types.ObjectId(rawUserId);

      const events = await this.eventModel.find({ user: userObjectId })
        .populate('user', 'firstName lastName email phone')
        .exec();

      return new ApiResponse("Eventos obtenidos exitosamente", 200, events);

    } catch (error) {
      console.log("Error en findCustomerMeEvent:", error);
      throw new InternalServerErrorException("No se pudieron obtener los eventos del usuario");
    }
  }

  async createReserveEvent(createEventDto: CreateReserveEventDto, userPayload: { userId: string; email: string; role: string }) {
    try {
      const newReserve = new this.eventModel({ 
        ...createEventDto, 
        user: new Types.ObjectId(userPayload.userId), 
        status: EventStatus.PENDIENTE 
      });
      const reserveSaved = await newReserve.save();
      return new ApiResponse("Evento reservado exitosamente", 201, reserveSaved);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EventsService.name);
    }
  }

  async cancelMyEvent(eventId: string, userPayload: { userId: string; email: string; role: string }) {
    try {
      if (!isValidObjectId(eventId)) {
        return new ApiResponse("El id no tiene el formato correcto", 400, null);
      }

      const updatedEvent = await this.eventModel.findOneAndUpdate(
        {
          _id: new Types.ObjectId(eventId),
          user: new Types.ObjectId(userPayload.userId) 
        },
        { status: "Cancelado" },
        { new: true } 
      );

      if (!updatedEvent) {
        throw new NotFoundException(`El evento con ID ${eventId} no fue encontrado o no tienes permiso para cancelarlo.`);
      }

      return new ApiResponse("Evento cancelado exitosamente", 200, updatedEvent);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, EventsService.name);
    }
  }
}