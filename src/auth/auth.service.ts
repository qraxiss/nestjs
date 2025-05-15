import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConstantService } from 'src/constant/constant.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private constantsService: ConstantService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = this.constantsService.CONSTANTS.USERS.find(user => user.email === email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.constantsService.CONSTANTS.JWT_KEY
            }),
        };
    }
}
