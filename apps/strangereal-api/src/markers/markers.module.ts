import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersController } from './markers.controller';
import { MarkersRepository } from './markers.repository';
import { UtilNestSqliteModule } from '@strangereal/util-nest-sqlite';
import * as Path from 'path';

@Module({
    imports: [
        UtilNestSqliteModule.register({
            filename: process.env.DB_PATH || '/tmp/strangereal-database.sqlite',
            migrations: Path.join(__dirname, '/assets/migrations')
        }),
    ],
    controllers: [MarkersController],
    providers: [MarkersService, MarkersRepository],
})
export class MarkersModule {}
