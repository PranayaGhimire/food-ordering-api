/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
  ) {}
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  async uploadPhoto(
    @UploadedFile() profileImage: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!profileImage) {
      throw new BadRequestException('File is required');
    }
    if (!profileImage.buffer) {
      throw new BadRequestException(
        'File buffer is empty. Check multer memoryStorage',
      );
    }
    const result = await this.cloudinaryService.uploadFile(profileImage);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      req.user.userId,
      { profileImageUrl: result.secure_url },
      { new: true },
    );
    return {
      message: 'Profile Picture Uploaded Successfully',
      user: updatedUser,
      cloudinary: result,
    };
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.userId);
  }
  @Put('me')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() body: RegisterDto) {
    return this.userService.updateProfile(req.user.userId, body);
  }
}
