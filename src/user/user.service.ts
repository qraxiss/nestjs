import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(user: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(id: number, updateUser: Partial<User>): Promise<User> {
        await this.userRepository.update(id, updateUser);
        return this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}