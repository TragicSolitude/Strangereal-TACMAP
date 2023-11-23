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

    async findUserById(id: number): Promise<User | null> {
        const query = `
            SELECT ROWID as id, username, password, permissions FROM users
            WHERE ROWID = ?
        `;

        const result = await this.database.get(query, id);
        if (!result) {
            return null;
        }

        return Object.create(User.prototype, {
            id: { value: result.id },
            username: { value: result.username },
            password: { value: result.password },
            permissions: { value: JSON.parse(result.permissions) }
        });
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const query = `
            SELECT ROWID as id, username, password, permissions FROM users
            WHERE username = ?
        `;

        const result = await this.database.get(query, username);
        if (!result) {
            return null;
        }

        return Object.create(User.prototype, {
            id: { value: result.id },
            username: { value: result.username },
            password: { value: result.password },
            permissions: { value: JSON.parse(result.permissions) }
        });
    }
}
