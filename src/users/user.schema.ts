import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
