/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cloudinaryService: CloudinaryService,
  ) {}
  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  create(data: LoginDto | RegisterDto) {
    return this.userModel.create(data);
  }
  findByIdAndUpdate(id: string, data: RegisterDto) {
    return this.userModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }
  findByRole(role: string) {
    return this.userModel.findOne({ role });
  }
  async uploadPhoto(file: Express.Multer.File, req: any) {
    if (!file) throw new BadRequestException('File is required');
    const result = await this.cloudinaryService.uploadFile(file);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      req.user.userId,
      {
        profileImageUrl: result.secure_url,
      },
      { new: true },
    );
    return {
      message: 'Profile Picture Updated Successfully',
      data: updatedUser,
      cloudinary: result,
    };
  }
  async getProfile(id: string) {
    const user = await this.userModel.findById(id);
    return {
      message: 'User Profile Fetched Successfully',
      data: user,
    };
  }
  async updateProfile(id: string, data: RegisterDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, data);
    return {
      message: 'User Profile Updated Successfully',
      data: updatedUser,
    };
  }
}
