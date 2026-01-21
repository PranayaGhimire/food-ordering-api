import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../users/user.schema';

export class RegisterDto {
  @IsString()
  fullName: string;
  @IsString()
  username: string;
  @IsString()
  phoneNumber: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  @MinLength(8)
  confirmPassword: string;
  @IsEnum(UserRole)
  role: UserRole;
}
