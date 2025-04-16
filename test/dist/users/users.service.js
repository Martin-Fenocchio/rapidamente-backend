"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const points_1 = require("../utils/points");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(payload) {
        if (payload.email) {
            const userWithEmail = await this.findUserByEmail(payload.email);
            if (userWithEmail)
                return userWithEmail;
        }
        if (await this.findUserByName(payload.name)) {
            throw new common_1.HttpException('NAME_ALREADY_EXISTS', common_1.HttpStatus.CONFLICT);
        }
        const newUser = new this.userModel(payload);
        return newUser.save();
    }
    async findAllUsers() {
        return this.userModel.find().exec();
    }
    async updatePoints(payload) {
        const user = await this.userModel.findById(payload.id);
        user.points = payload.points;
        if (payload.history) {
            user.history = (0, points_1.mergeHistories)(user.history, payload.history);
        }
        return user.save();
    }
    async findUserByName(name) {
        const user = await this.userModel.findOne({ name });
        return user;
    }
    async linkEmail(payload) {
        console.log('linkEmail', JSON.stringify(payload));
        const user = await this.userModel.findById(payload.userId);
        if (!user) {
            throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        user.email = payload.email;
        if (user.history) {
            user.history = (0, points_1.mergeHistories)(user.history, payload.history);
        }
        else {
            user.history = payload.history;
        }
        await user.save();
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('USER_NOT_FOUND', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map