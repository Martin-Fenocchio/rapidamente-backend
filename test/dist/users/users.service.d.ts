import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdatePointsDto } from './users.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(payload: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    updatePoints(payload: UpdatePointsDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findUserByName(name: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    linkEmail(payload: {
        email: string;
        userId: string;
        history: string;
    }): Promise<void>;
    findUserByEmail(email: string): Promise<User>;
}
