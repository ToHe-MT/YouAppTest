import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    birthday?: string;

    @Prop({ required: false })
    height?: number;

    @Prop({ required: false })
    weight?: number;

    @Prop({ required: false })
    interests?: string[];



}

export const UserSchema = SchemaFactory.createForClass(User)