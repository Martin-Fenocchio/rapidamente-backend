import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto, LinkEmailDto, UpdatePointsDto } from './users.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findAll(): Promise<User[]>;
    create(body: CreateUserDto): Promise<User>;
    updatePoints(body: UpdatePointsDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    linkEmail(body: LinkEmailDto): Promise<string>;
    findByEmail(email: string): Promise<User>;
}
