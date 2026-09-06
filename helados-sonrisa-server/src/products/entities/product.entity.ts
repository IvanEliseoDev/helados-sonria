import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Product {

    @Prop({
        index: true,
        required: true
    })
    name!: string

    @Prop({
        index: true,
        required: true
    })
    type!: string

    @Prop({
        index: true,
        required: true
    })
    category!: string

    @Prop({ required: false, default: null })
    description?: string

    @Prop({ required: false, default: null })
    presentations?: string[]

    @Prop({
        type: [{
            image: { type: String, required: true },
            publicId: { type: String, required: true },
            _id: false
        }],
        default: []
    })
    images!: { image: string; publicId: string }[]

    @Prop({required: false, default: "Disponible", enum: ['Disponible', 'No disponible', 'Desactivado']})
    status!: string
}

export const productSchema = SchemaFactory.createForClass(Product)