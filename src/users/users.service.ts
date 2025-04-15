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
      const userWithEmail = await this.findUserByEmail(payload.email);

      if (userWithEmail) return userWithEmail;
    }

    if (await this.findUserByName(payload.name)) {
      throw new HttpException('NAME_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const newUser = new this.userModel(payload);

    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updatePoints(payload: UpdatePointsDto) {
    console.log('payload updatePoints', JSON.stringify(payload));

    const user = await this.userModel.findById(payload.id);

    console.log('USER', JSON.stringify(user));

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

    if (user.history) {
      user.history = mergeHistories(user.history, payload.history);
    } else {
      user.history = payload.history;
    }

    await user.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /* async signUp(payload: SignUpDto) {
    if (await this.findUserByName(payload.name)) {
      throw new HttpException('NAME_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }

    const user = await this.createUser(payload.name);
    const scores = payload.history.map((point) => ({
      ...point,
      user: user.id,
    }));

    this.scoresService.createMany(scores);

    return { userID: user.id };
  } */
}
