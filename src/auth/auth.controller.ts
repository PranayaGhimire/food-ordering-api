/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
import { RefreshTokenGuard } from '../common/guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.register(dto);
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'User Registered Successfully',
      data: user,
    };
  }
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(dto);
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'User Logged In successfully',
      data: user,
    };
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    await this.userModel.findByIdAndUpdate(req.user.sub, {
      refreshToken: null,
    });
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'User logged out successfully' };
  }
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
