import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as Sqlite from 'sqlite';
import { ModuleConfig } from "./module-config";

@Injectable()
export class DbConnection implements OnModuleInit {
    constructor(@Inject('SQLITE_DATABASE')
                public readonly database: Sqlite.Database,
                @Inject('SQLITE_MODULE_OPTIONS')
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
