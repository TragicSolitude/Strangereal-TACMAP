import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth-guard';
import { AuthenticationModule } from './authentication/authentication.module';

export interface ModuleOptions {
    secret: string;
}

@Module({})
export class UtilNestAuthModule {
    static register(options: ModuleOptions): DynamicModule {
        return {
            module: UtilNestAuthModule,
            providers: [
                AuthGuard,
                // TODO provide user service for auth service
            ],
            imports: [
                AuthenticationModule,
                JwtModule.register({
                    global: true,
                    secret: options.secret,
                    signOptions: { expiresIn: '60s' },
                }),
            ],
        };
    }
}
