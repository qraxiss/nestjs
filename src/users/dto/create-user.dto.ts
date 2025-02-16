// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'kullanici@ornek.com',
        description: 'Kullanıcı email adresi',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Sifre123!',
        description: 'Kullanıcı şifresi (min 6 karakter)',
        minLength: 6,
        required: true
    })
    @IsString()
    @MinLength(6)
    password: string;
}