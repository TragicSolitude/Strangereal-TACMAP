import { DynamicModule, Module } from '@nestjs/common';
import { ModuleConfig } from './module-config';
import * as Sqlite3Driver from 'sqlite3';
import * as Sqlite from 'sqlite';
import { DbConnection } from './db-connection';

@Module({})
export class UtilNestSqliteModule {
    static register(config: ModuleConfig): DynamicModule {
        return {
            module: UtilNestSqliteModule,
            providers: [
                {
                    provide: 'database-config',
                    useValue: config
                },
                {
                    provide: 'database',
                    useFactory: () => {
                        return Sqlite.open({
                            filename: config.filename,
                            driver: Sqlite3Driver.Database
                        });
                    }
                },
                DbConnection
            ],
            exports: [DbConnection]
        }
    }
}
