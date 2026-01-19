import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../users/user.schema';

export class RegisterDto {
  @IsString()
  fullName: string;
  @IsString()
  username: string;
  @IsString()
  phoneNumber: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  confirmPassword: string;
  @IsEnum(UserRole)
  role: UserRole;
}
