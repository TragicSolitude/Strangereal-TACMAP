import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(private readonly usersRepository: UsersRepository) {}

    onModuleInit() {
        console.log('Module init', Date.now());
    }

    findUserById(id: number): Promise<User | null> {
        return this.usersRepository.findUserById(id);
    }

    findUserByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findUserByUsername(username);
    }

    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
