import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { UserService } from '@user/user.service'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogHelper } from '@shared/helpers/log.helper';

@Injectable()
export class AuthService {

    constructor(
        private userService:UserService,
        private jwtService: JwtService
    ) {}

    async signUp(signupDto: SignUpDTO): Promise<{token:string}> {

        const user = await this.userService.findByEmail(signupDto.email);
        if(user) throw new HttpException('An account with this email already exists, please login.', HttpStatus.CONFLICT);

        const newUser = await this.userService.createUser(signupDto);

        const payload = {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name
        }
        const token = await this.jwtService.signAsync(payload);

        return {token};

    }

    async signIn(signInDto: SignInDTO): Promise<{token:string}> {

        const user = await this.userService.findByEmail(signInDto.email);
        if(!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

       const isPasswordValid = await bcrypt.compare(signInDto.password as string, user.password.toString());
        if(!isPasswordValid) throw new HttpException("Please check your email or password", 401);

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        }

        const token = await this.jwtService.signAsync(payload);

        return {token};

    }
}
