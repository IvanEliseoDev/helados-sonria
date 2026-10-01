import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { EventType } from "../enums/event-type.enum";
import { Customer } from "src/customers/entities/customer.entity";
import { string } from "zod";
import { EventStatus } from "../enums/event-status.enum";

//? @Schema: Le dice a NestJS que esta clase representa una "Colección" en MongoDB.
//* Por defecto, la colección se llamará "Event" (plural de la clase).
@Schema({timestamps: true}) //* Agrega createdAt y updatedAt automáticamente
export class Event extends Document {

    @Prop({
        index: true, required: true
    })
    name!: string;

    @Prop()
    description!: string;

    @Prop()
    eventTime!: string

    @Prop()
    initDate!: string;

    @Prop()
    location!: string

    @Prop({
        index: true,
        type: String,
        enum: EventType,
        default: EventType.OTROS
    })
    eventType!: string;

    @Prop({
        type: string,
        enum: EventStatus,
        default: EventStatus.PENDIENTE
    })
    status!: string

    images!: string[]

    @Prop({ 
        type: Types.ObjectId, 
        ref: Customer.name, // Debe coincidir con el nombre de la clase (Customer)
        required: true,
        index: true 
    })
    user!: Types.ObjectId;

}

export const eventSchema = SchemaFactory.createForClass(Event);