import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { Event } from 'src/events/entities/event.entity';
import { ApiResponse } from 'src/utils/api.response';
import { handleDBException } from 'src/utils/handle-exceptions.util';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async findAll() {
    try {
      const kpiCards = await this.kpiCardsData();
      const eventsPendingView = await this.eventModel.find({
        status: 'Pendiente',
      });
      return new ApiResponse(
        'Datos del dashboard obtenidos exitosamente',
        200,
        { kpiCards, eventsPendingView },
      );
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AdminDashboardService.name);
    }
  }

  async kpiCardsData() {
    try {
      const totalCustomers = await this.customerModel.countDocuments();
      const totalEventsPending = await this.eventModel.countDocuments({
        status: 'Pendiente',
      });
      const cancelEvents = await this.eventModel.countDocuments({
        status: 'Cancelado',
      });
      return {
        totalCustomers,
        totalEventsPending,
        cancelEvents,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handleDBException(error, AdminDashboardService.name);
    }
  }
}
