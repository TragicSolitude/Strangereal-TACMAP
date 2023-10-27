import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkersModule } from '../markers/markers.module';
import { UtilNestAuthModule } from '@strangereal/util-nest-auth';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UtilNestSqliteModule } from '@strangereal/util-nest-sqlite';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Path from 'path';

const additionalModules = [];
if (process.env.NODE_ENV === 'production') {
    additionalModules.push(
        ServeStaticModule.forRoot({
            rootPath: Path.join(__dirname, 'public')
        })
    );
}

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // UtilNestSqliteModule.forRoot({
        //     filename: process.env.DB_PATH || '/tmp/strangereal-database.sqlite',
        //     migrations: Path.join(__dirname, '/assets/migrations')
        // }),
        UtilNestSqliteModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                filename: config.get<string>('database.path', '/tmp/strangereal-database.sqlite'),
                migrations: config.get<string>('database.migrations', Path.join(__dirname, '/assets/migrations'))
            })
        }),
        // TODO update secret key with env var
        // UtilNestAuthModule.register({
        //     secret: 'asdf',
        //     userRepository: UsersService,
        //     // TODO make this less jank looking somehow, registerAsync but
        //     // still allow auth module to configure jwtmodule
        //     imports: [UsersModule]
        // }),
        UtilNestAuthModule.register({
            // Any way to make this less jank? Can't inject users service
            // because module isolation
            userRepository: UsersService,
            imports: [UsersModule]
        }),
        MarkersModule,
        UsersModule,
        ...additionalModules
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
