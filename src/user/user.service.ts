import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/model/user-dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    create(user:UserDto): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email: email }).exec();
    }

}
