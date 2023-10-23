import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from '../types/user';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserService) {}

    async findLogin(username: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findUserByUsername(username);
        const passwordHash = user?.password || '';

        // TODO create hasher service in DI
        if (await Bcrypt.compare(password, passwordHash)) {
            return user;
        }

        return null;
    }
}
