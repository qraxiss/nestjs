import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantService } from 'src/constant/constant.service';
import { StatusDecorator } from 'src/status/status.decorator';
import { UserDto } from './auth.dto';
import { LoginDto } from './auth.dto';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private constantsService: ConstantService
    ) { }

    @StatusDecorator<UserDto>()
    async validateUser(email: string, pass: string): Promise<any> {
        const user = this.constantsService.CONSTANTS.USERS.find(user => user.email === email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    @StatusDecorator<LoginDto>()
    async login(user: any): Promise<LoginDto> {
        const payload = { email: user.email, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.constantsService.CONSTANTS.JWT_KEY
            }),
        };
    }
}
