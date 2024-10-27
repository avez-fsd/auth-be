import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { SignUpDTO } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LogHelper } from '@shared/helpers/log.helper';
import { AuditEventType } from '@constant';



@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private loggerHelper: LogHelper
    ) {}

    async findByEmail(email: string) {
        return this.userModel.findOne({
            email
        })
    }

    async createUser(userDto: SignUpDTO) {

        const userData = {
            ...userDto,
            password: await bcrypt.hash(userDto.password, 8)
        }

        const user = await (await this.userModel.create(userData)).save();

        this.loggerHelper.info(`${AuditEventType.CREATE_USER}|SUCCESS`, user);

        return user;
    }
}
