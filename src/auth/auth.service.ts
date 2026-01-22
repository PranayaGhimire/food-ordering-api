/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async generateTokens(user: User, rememberMe = false) {
    const payload = { sub: user._id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshTokenExpiresIn = rememberMe ? '30d' : '1d';
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn,
    });
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashedRefresh,
    });
    return { accessToken, refreshToken, rememberMe };
  }
  async register(dto: RegisterDto) {
    const { confirmPassword, ...rest } = dto;
    if (dto.password !== confirmPassword)
      throw new BadRequestException('Passwords do not match');
    if (dto.role === UserRole.ADMIN) {
      const existingAdmin = await this.usersService.findByRole(dto.role);
      if (existingAdmin)
        throw new ConflictException('An admin account already exists');
    }
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already in use');
    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.create({
      ...rest,
      password: hashed,
    });
    return newUser;
  }
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.provider === 'GOOGLE') {
      throw new UnauthorizedException(
        'This account uses Google login. Please sign in with Google',
      );
    }
    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new UnauthorizedException();
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userModel.findById(payload.sub);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException();
    const newAccessToken = this.jwtService.sign(
      { sub: user._id, role: user.role },
      { expiresIn: '15m' },
    );
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'Token Refreshed' };
  }
  async googleLogin(profile: {
    email: string;
    fullName: string;
    photo: string;
  }) {
    if (!profile.email) {
      throw new UnauthorizedException('Google account has no email');
    }
    let user = await this.usersService.findByEmail(profile.email);
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        fullName: profile.fullName,
        profileImageUrl: profile.photo,
        provider: 'GOOGLE',
        role: UserRole.USER,
        password: null,
      });
    }
    return user;
  }
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { message: 'If email exists, reset link sent' };

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    await this.userModel.findByIdAndUpdate(user._id, {
      passwordResetToken: hashedToken,
      passwordResetExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 min
    });
    const resetUrl = `${process.env.FRONTEND_REDIRECT_URL}/auth/resetPassword/${resetToken}`;
    await this.mailService.sendResetPasswordEmail(email, resetUrl);
    return {
      message: 'Password reset link sent',
    };
  }
  async resetPassword(dto: ResetPasswordDto) {
    const { token, password } = dto;
    if (!password) {
      throw new UnauthorizedException('Password is required');
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await this.userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) throw new UnauthorizedException('Invalid or expired token');
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return {
      message: 'Password reset successful',
    };
  }
}
