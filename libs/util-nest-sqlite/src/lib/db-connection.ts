import { Inject, Injectable } from "@nestjs/common";
import * as Sqlite from 'sqlite';

@Injectable()
export class DbConnection {
    constructor(@Inject('database') public readonly database: Sqlite.Database) {}
}
