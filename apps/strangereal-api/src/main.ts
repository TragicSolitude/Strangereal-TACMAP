/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Workaround for intermittent bug where this is left out of generated package
import '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const adapter = new FastifyAdapter();
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
    app.useGlobalPipes(new ValidationPipe());

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    const port = process.env.PORT || 3000;
    let address = 'localhost';
    if (process.env.NODE_ENV === 'production') {
        address = '0.0.0.0';
    }
    await app.listen(port, address);
    Logger.log(
        `🚀 Application is running on: http://${address}:${port}/${globalPrefix}`
    );
}

bootstrap();
