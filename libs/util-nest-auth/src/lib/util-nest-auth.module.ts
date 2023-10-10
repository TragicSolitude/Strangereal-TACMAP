import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth-guard';

export interface ModuleOptions {
    secret: string;
}

@Module({})
export class UtilNestAuthModule {
    static register(options: ModuleOptions): DynamicModule {
        return {
            module: UtilNestAuthModule,
            providers: [AuthGuard],
            imports: [
                JwtModule.register({
                    global: true,
                    secret: options.secret,
                    signOptions: { expiresIn: '60s' }
                })
            ]
        }
    }
}
