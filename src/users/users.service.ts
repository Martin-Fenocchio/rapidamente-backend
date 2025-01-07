import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdatePointsDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(payload: CreateUserDto): Promise<User> {
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
    return this.userModel.updateOne(
      { _id: payload.id },
      { points: payload.points },
    );
  }

  async findUserByName(name: string) {
    const user = await this.userModel.findOne({ name });

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
