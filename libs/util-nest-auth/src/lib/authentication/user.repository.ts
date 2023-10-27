import { Injectable } from '@nestjs/common';
import { UserDetails } from '../types/user';

@Injectable()
export abstract class UserRepository {
    abstract findUserByUsername(username: string): Promise<UserDetails | null>;
}
