import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from 'src/utils/api.response';
import { MongoError } from 'src/errors/mongoError.interface';

@Injectable()
export class EventsService {

  private readonly eventModel: Model<Event>
  //? @InjectModule pide a Nest el modelo que registramos en el eventModule
  constructor(@InjectModel(Event.name) eventModel: Model<Event>) {
    //*Guardamos el modelo que Nest nos dio en nuestra propiedad privada.
    this.eventModel = eventModel
  }  
  async create(createEventDto: CreateEventDto) {
    try {
      const event = await this.eventModel.create(createEventDto)
      return new ApiResponse("Evento Creado Exitosamente", 201, event);
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`Pokemon Exist in DB ${JSON.stringify(mongoError.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
    }
  }

  async findAll() {
    const events = await this.eventModel.find()
    return new ApiResponse("Eventos obtenidos exitosamente", 200, events);
  }

  async findOne(term: string) {
    let event: Event | null = null
    if (isValidObjectId(term)) {
      event = await this.eventModel.findById(term)
    }
    if (!term) {
      event = await this.eventModel.findOne({ name: term })
    }
    if (!event) throw new NotFoundException("El evento con el id, name o UUID no fue encontrado")
    return new ApiResponse("Evento obtenido exitosamente", 200, event)
  }

  async update(term: string, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.findOne(term)
      const eventUpd = await event.data?.updateOne(updateEventDto, { new: true })
      return new ApiResponse("Evento actualizado exitosamente", 200, eventUpd)
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`Pokemon Exist in DB ${JSON.stringify(mongoError.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
    }
  }

  async remove(term: string) {
    try {
      const eventDelete = await this.findOne(term)
      await this.eventModel.deleteOne(eventDelete)
      return new ApiResponse("Evento eliminado exitosamente", 204, null)
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`Evento existente en la BD ${JSON.stringify(mongoError.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`No se pudo eliminar el Evento - Revisa los server logs`)
    }
  }

  async removeAll() {
    try {
      await this.eventModel.deleteMany()
      return new ApiResponse("Eventos eliminados exitosamente", 204, null)
    } catch (error) {
      const mongoError = error as MongoError;
      if (mongoError.code === 11000) {
        throw new BadRequestException(`Evento existente en la BD ${JSON.stringify(mongoError.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`No se lograron eliminar todos los eventos - revisa los server logs`)
    }
  }

  async insertMany(createEventDtos: CreateEventDto[]) {
    try {
      await this.eventModel.insertMany(createEventDtos)
      return new ApiResponse("Todos los eventos han sido insertados exitosamente")
    } catch (error) {
      console.log(error)
    const mongoError = error as MongoError;
    if(mongoError.code == 11000) throw new BadRequestException(`Evento existe en la BD ${JSON.stringify(mongoError.keyValue)}`)
    throw new InternalServerErrorException(`Internal Server Error - Check Server Logs`)
    }
  }
}


