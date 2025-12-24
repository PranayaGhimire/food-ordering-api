import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  create(data: LoginDto | RegisterDto) {
    return this.userModel.create(data);
  }
}
