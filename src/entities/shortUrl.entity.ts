import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';

@Schema()
export class ShortUrl extends Document {
    @Prop({required: true, unique: true})
    longUrl: string 

    @Prop({required: true, unique: true, message: 'urlHash obviously has to be unique'})
    urlHash: string 

    @Prop({required: true})
    timesCreated: number 

    @Prop({required: true})
    timesAccessed: number 

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);