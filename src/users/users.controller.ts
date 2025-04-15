import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto, LinkEmailDto, UpdatePointsDto } from './users.dto';

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
    return this.userService.updatePoints(body);
  }

  @Put('/link-email')
  async linkEmail(@Body() body: LinkEmailDto) {
    await this.userService.linkEmail(body);
    return 'Email linked successfully';
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
