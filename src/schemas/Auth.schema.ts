import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class Auth extends Document {
    @Prop({required: true, unique:true} )
    email:string;
    
    @Prop({required: true, unique:true} )
    username: string;
    
    @Prop({required: true} )
    password: string;
    static username: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Types.ObjectId;
}

export const AuthSchema = SchemaFactory.createForClass(Auth)                                                   