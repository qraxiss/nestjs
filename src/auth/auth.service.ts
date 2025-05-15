import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private envService: EnvService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = UserService.USERS.find(user => user.email === email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.email };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.envService.envConfig.JWT_KEY
            }),
        };
    }
}
