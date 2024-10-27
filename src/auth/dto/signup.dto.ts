import { MinLength, IsEmail, Matches  } from 'class-validator';

export class SignUpDTO {

    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    })
    password: string;
}