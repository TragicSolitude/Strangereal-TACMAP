import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkersModule } from '../markers/markers.module';
import { UtilNestAuthModule } from '@strangereal/util-nest-auth';
import { ServeStaticModule } from '@nestjs/serve-static';
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
        // TODO update secret key with env var
        UtilNestAuthModule.register({ secret: 'todo-secret-key' }),
        MarkersModule,
        ...additionalModules
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
