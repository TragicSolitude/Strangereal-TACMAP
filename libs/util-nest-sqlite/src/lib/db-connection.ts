import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as Sqlite from 'sqlite';
import { ModuleConfig } from "./module-config";

@Injectable()
export class DbConnection implements OnModuleInit {
    constructor(@Inject('database')
                public readonly database: Sqlite.Database,
                @Inject('database-config')
                private readonly config: ModuleConfig) {}

    async onModuleInit(): Promise<void> {
        const migrationsPath = this.config.migrations;
        if (!migrationsPath) {
            return;
        }

        const force = process.env['NODE_ENV'] !== 'production';
        await this.database.migrate({ migrationsPath, force });
    }
}
