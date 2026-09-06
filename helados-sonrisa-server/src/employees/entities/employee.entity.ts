import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import request from 'supertest';

@Schema({timestamps: true})
export class Employee {

    @Prop({
     index: true,
     required: true
    })
    firstName!: string

    @Prop({
        index: true,
        required: true
    })
    lastName!: string

    @Prop({
        index: true,
        required: true
    })
    email!: string

    @Prop({})
    password!: string

    @Prop({default: 0})
    loginAttempts!: number

    @Prop({type: Date, default: null})
    lockUntil!: Date | null

    @Prop({default: true})
    isActive!: boolean;

}

export const employeeSchema = SchemaFactory.createForClass(Employee)
