import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdatePointsDto } from './users.dto';
import { mergeHistories } from 'src/utils/points';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    if (payload.email) {
      const userWithEmail = await this.findUserByEmail(payload.email, true);

      if (userWithEmail) return userWithEmail;
    }
    let userName = payload.name;

    if (await this.findUserByName(payload.name)) {
      userName = `${payload.name}-${Math.floor(Math.random() * 1000)}`;
    }

    const newUser = new this.userModel({ ...payload, name: userName });

    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updatePoints(payload: UpdatePointsDto) {
    const user = await this.userModel.findById(payload.id);
    user.points = payload.points;

    if (payload.history) {
      user.history = mergeHistories(user.history, payload.history);
    }

    return user.save();
  }

  async findUserByName(name: string) {
    const user = await this.userModel.findOne({ name });

    return user;
  }

  async linkEmail(payload: { email: string; userId: string; history: string }) {
    console.log('linkEmail', JSON.stringify(payload));

    const user = await this.userModel.findById(payload.userId);

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    user.email = payload.email;

    if (payload.history) {
      if (user.history) {
        user.history = mergeHistories(user.history, payload.history);
      } else {
        user.history = payload.history;
      }
    }

    return await user.save();
  }

  async findUserByEmail(email: string, silent?: boolean): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user && !silent) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
