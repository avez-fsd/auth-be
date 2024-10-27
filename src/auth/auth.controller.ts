import { Controller, Post, Body, ValidationPipe, Headers } from '@nestjs/common';
import {SignUpDTO} from './dto/signup.dto'
import {SignInDTO} from './dto/signin.dto'
import { LogHelper } from '@shared/helpers/log.helper'
import {AuthService} from './auth.service'
import {ResponseHelper} from '@shared/helpers/response.helper'
import { AuditEventType } from '@constant'

@Controller('auth')
export class AuthController {

    constructor(
        private readonly logger: LogHelper,
        private authService: AuthService,
        private responseHelper: ResponseHelper
    ) {}

    @Post('sign-up')
    async signUp(@Body(ValidationPipe) signupDto: SignUpDTO) {
        try {
            const user = await this.authService.signUp(signupDto);
            return this.responseHelper.success(user)
        } catch(err:any) {
            this.logger.error(`${AuditEventType.SIGN_UP}|EXCEPTION|msg=${err.message}`, err)
            throw err;
        }
    }

    @Post('sign-in')
    async signIn(@Body(ValidationPipe) signInDto: SignInDTO) {
        try {
            const user = await this.authService.signIn(signInDto);
            return this.responseHelper.success(user);
        } catch(err:any) {
            this.logger.error(`${AuditEventType.SIGN_UP}|EXCEPTION|msg=${err.message}`, err)
            throw err;
        }
    }
}
