import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkersModule } from '../markers/markers.module';
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
        MarkersModule,
        ...additionalModules
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
