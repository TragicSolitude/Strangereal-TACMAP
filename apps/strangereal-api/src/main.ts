/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
    const adapter = new FastifyAdapter();
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
    app.useGlobalPipes(new ValidationPipe());

    const config = app.get(ConfigService);

    const globalPrefix = config.get<string>('routePrefix', 'api');
    app.setGlobalPrefix(globalPrefix);

    const secret = config.getOrThrow<string>('secret');
    app.register(fastifyCookie, { secret });

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`Listening on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
