/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(
    @UploadedFile() profileImage: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.userService.uploadPhoto(profileImage, req);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  getUsers() {
    return this.userService.getUsers();
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
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
