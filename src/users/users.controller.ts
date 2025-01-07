import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto, UpdatePointsDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return (await this.userService.findAllUsers()).sort(
      (a, b) => b.points - a.points,
    );
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put('/update-points')
  async updatePoints(@Body() body: UpdatePointsDto) {
    this.userService.updatePoints(body);
    return;
  }
}
