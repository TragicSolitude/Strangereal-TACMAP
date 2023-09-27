import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarkersModule } from '../markers/markers.module';

@Module({
    imports: [MarkersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
