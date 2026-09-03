import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Customer {

    _id!: String

    @Prop({
        index: true
    })
    firstName!: string

    @Prop({
        index: true
    })
    lastName!: string

    @Prop({
        index: true,
        unique: true,
    })
    email!: string

    @Prop()
    phone!: string

    @Prop()
    password!: string

    @Prop({ default: 0 })
    loginAttempts!: number;

    @Prop({ type: Date, default: null })
    lockUntil!: Date | null;

    @Prop({ default: true })
    isActive!: boolean;
}

export const customerSchema = SchemaFactory.createForClass(Customer)
