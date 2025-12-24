/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user?.role === UserRole.ADMIN)
      return { message: 'Admin is already created' };
    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.create({
      ...dto,
      password: hashed,
    });
    return {
      message: 'New user registered successfully',
      data: newUser,
    };
  }
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      message: 'User logged in successfully',
      data: user,
      accessToken: this.jwtService.sign({
        sub: user._id,
        role: user.role,
      }),
    };
  }
}
