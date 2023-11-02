import { Injectable } from '@nestjs/common';
import { UserDetails } from '../types/user';

@Injectable()
export abstract class UserRepository {
    abstract findUserById(id: number): Promise<UserDetails | null>;
    abstract findUserByUsername(username: string): Promise<UserDetails | null>;
}
