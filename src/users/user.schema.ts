import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop({ nullable: true })
  profileImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
