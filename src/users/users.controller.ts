import {
  BadRequestException,
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

@Controller('users')
export class UsersController {
  constructor(private cloudinaryService: CloudinaryService) {}
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
    }),
  )
  uploadPhoto(@UploadedFile() profileImage: Express.Multer.File) {
    if (!profileImage) {
      throw new BadRequestException('File is required');
    }
    return this.cloudinaryService.uploadFile(profileImage);
  }
}
