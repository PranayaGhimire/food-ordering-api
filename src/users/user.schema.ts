import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  fullName: string;

  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: String, required: false, default: null, minLength: 8 })
  password?: string | null;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop({ nullable: true })
  profileImageUrl: string;

  @Prop()
  refreshToken?: string;

  @Prop({ default: 'LOCAL' })
  provider: 'LOCAL' | 'GOOGLE';

  @Prop({ type: String, default: null })
  passwordResetToken?: string | null;

  @Prop({ type: Date, default: null })
  passwordResetExpires?: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
