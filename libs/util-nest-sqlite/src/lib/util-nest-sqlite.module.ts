import { ConfigurableModuleBuilder, DynamicModule, Global, Module } from '@nestjs/common';
import { ModuleConfig } from './module-config';
import * as Sqlite3Driver from 'sqlite3';
import * as Sqlite from 'sqlite';
import { DbConnection } from './db-connection';

const ModuleConfig = new ConfigurableModuleBuilder<ModuleConfig>({moduleName: 'Sqlite'})
    .setClassMethodName('forRoot')
    .build();

@Global()
@Module({
    providers: [
        {
            provide: 'SQLITE_DATABASE',
            inject: [ModuleConfig.MODULE_OPTIONS_TOKEN],
            useFactory: (options) => Sqlite.open({
                filename: options.filename,
                driver: Sqlite3Driver.Database
            })
        },
        DbConnection
    ],
    exports: [DbConnection]
})
export class UtilNestSqliteModule extends ModuleConfig.ConfigurableModuleClass {
    // static forRoot(config: ModuleConfig): DynamicModule {
    //     return {
    //         module: UtilNestSqliteModule,
    //         providers: [
    //             {
    //                 provide: 'database-config',
    //                 useValue: config
    //             },
    //             {
    //                 provide: 'database',
    //                 useFactory: () => {
    //                     return Sqlite.open({
    //                         filename: config.filename,
    //                         driver: Sqlite3Driver.Database
    //                     });
    //                 }
    //             },
    //             DbConnection
    //         ],
    //         exports: [DbConnection],
    //         global: true
    //     }
    // }
}
