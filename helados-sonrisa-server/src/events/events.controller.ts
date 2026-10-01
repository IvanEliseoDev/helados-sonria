import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateReserveEventDto } from './dto/create-reserve-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Post("/me")
  @UseGuards(AuthGuard('jwt'))
  createReserveEvent(@Body() createEventDto: CreateReserveEventDto, @GetUser() userPayload: { userId: string; email: string; role: string }) {
    return this.eventsService.createReserveEvent(createEventDto, userPayload)
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get("/me")
  @UseGuards(AuthGuard('jwt'))
  findMyEvents(@GetUser() userPayload: any) {
    return this.eventsService.findCustomerMeEvent(userPayload);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.eventsService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(term, updateEventDto);
  }

  @Put('/me/:term')
  @UseGuards(AuthGuard('jwt'))
  updateMyEvent(@Param('term') term: string, @Body() updateEventDto: UpdateEventDto, @GetUser() userPayload: { userId: string; email: string; role: string }  ){
    return this.eventsService.updateMyEvent(term, updateEventDto, userPayload)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Delete('/me/:id')
  @UseGuards(AuthGuard('jwt'))
  cancelEvent(@Param('id') id:string, @GetUser() userPayload: { userId: string; email: string; role: string }){
    return this.eventsService.cancelMyEvent(id, userPayload)
  }
}
