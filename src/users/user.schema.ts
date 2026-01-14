import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  @Prop()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @Prop()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(10)
  @Prop({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Prop()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  @Prop()
  password: string;

  @IsNotEmpty()
  @Prop({ default: UserRole.USER })
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  @Prop({ nullable: true })
  profileImageUrl: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
