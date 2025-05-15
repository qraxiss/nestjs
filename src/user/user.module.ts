import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UserService],
  imports: [
  ],
})
export class UserModule { }
