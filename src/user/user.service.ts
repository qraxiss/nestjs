import { Injectable } from '@nestjs/common';
import { User } from './user.type';


@Injectable()
export class UserService {
    static USERS: User[] = []

    constructor(
    ) { }
}