import {
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private cloudinaryService: CloudinaryService) {}
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() profileImage: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(profileImage);
  }
}
