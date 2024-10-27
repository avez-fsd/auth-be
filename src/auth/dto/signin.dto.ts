import { MinLength, IsEmail  } from 'class-validator';

export class SignInDTO {

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}