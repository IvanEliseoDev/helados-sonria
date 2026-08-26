import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EventType } from "../enums/event-type.enum";

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

    images!: string[]

    @Prop()
    user!: string;

}

export const eventSchema = SchemaFactory.createForClass(Event);