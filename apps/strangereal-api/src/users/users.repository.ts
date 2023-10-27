import { Injectable } from "@nestjs/common";
import { DbConnection } from "@strangereal/util-nest-sqlite";

import * as Sqlite from 'sqlite';
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository {
    private readonly database: Sqlite.Database;

    constructor(dbConnection: DbConnection) {
        this.database = dbConnection.database;
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const query = `
            SELECT ROWID as id, username, password, permissions FROM users
            WHERE username = ?
        `;

        const result = await this.database.get<User>(query, username);
        return result || null;
    }
}
