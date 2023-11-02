import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDetails } from '../types/user';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserRepository) {}

    async findUserById(id: number): Promise<UserDetails | null> {
        return this.userService.findUserById(id);
    }

    async findLogin(username: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findUserByUsername(username);
        // TODO verify that empty string is the same as random junk for timing
        // purposes
        const passwordHash = user?.password || '';

        // TODO create hasher service in DI
        if (await Bcrypt.compare(password, passwordHash)) {
            return user;
        }

        return null;
    }
}
