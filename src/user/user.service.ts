import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async findAllUser() {
        try {
            const users = await this.userModel.find().select('-password').exec();

            if (!users) {
                throw new NotFoundException('No user found');
            };

            return users;
        }
        catch (error) {
            throw new InternalServerErrorException(
                error.message || 'Unable to get the user'
            );
        }
    }

    async findUserById(id: string) {
        try {
            const user = await this.userModel.findById(id).select('-password').exec();

            if (!user) {
                throw new NotFoundException('User not found');
            };

            return user;
        }
        catch (error) {
            throw new InternalServerErrorException(
                error.message || 'Unable to get the user'
            );
        }
    }
}
