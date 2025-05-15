import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'user@mail.com',
        description: 'User email address',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123!',
        description: 'User password',
    })
    @IsString()
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({ type: LoginDto })
    @IsObject()
    @IsOptional()
    data: LoginDto | null
}