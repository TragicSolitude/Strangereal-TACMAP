import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersController } from './markers.controller';
import { MarkersRepository } from './markers.repository';

@Module({
    controllers: [MarkersController],
    providers: [MarkersService, MarkersRepository],
})
export class MarkersModule {}
