import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { AdminModule } from './admin/admin.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, JwtStrategy, LocalStrategy],
  imports: [UserModule, AdminModule]
})
export class AuthModule { }
