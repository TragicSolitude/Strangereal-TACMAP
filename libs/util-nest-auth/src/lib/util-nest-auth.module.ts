import { ConfigurableModuleBuilder, DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth-guard';
import { UserRepository } from './authentication/user.repository';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';

export interface ModuleOptions {
    userRepository: Type<UserRepository>;
    /**
     * Can be used to import the modules that provide the class specified for
     * userRepository.
     */
    imports?: ModuleMetadata['imports']
}

// const ModuleConfig = new ConfigurableModuleBuilder<ModuleOptions>({moduleName: 'Auth'})
//     .build();

// @Module({
//     controllers: [AuthenticationController],
//     providers: [
//         {
//             provide: UserRepository,
//             inject: [ModuleConfig.MODULE_OPTIONS_TOKEN],
//             useFactory: (options) => options.userRepository
//         },
//         AuthGuard,
//         AuthenticationService
//     ],
//     imports: [
//         // There's really no way to inject module options here?
//         JwtModule.registerAsync({
//             global: true,
//             inject: [ConfigService],
//             useFactory: (config: ConfigService) => ({
//                 secret: config.get<string>('jwt.secret'),
//                 signOptions: {
//                     expiresIn: config.get<string>('jwt.ttl', '60s')
//                 }
//             })
//         })
//     ]
// })
// export class UtilNestAuthModule extends ModuleConfig.ConfigurableModuleClass {}

@Module({})
export class UtilNestAuthModule {
    static register(options: ModuleOptions): DynamicModule {
        const imports = options.imports || [];
        return {
            module: UtilNestAuthModule,
            controllers: [AuthenticationController],
            providers: [
                {
                    provide: UserRepository,
                    useExisting: options.userRepository
                },
                AuthGuard,
                AuthenticationService
            ],
            imports: [
                ...imports,
                JwtModule.registerAsync({
                    global: true,
                    inject: [ConfigService],
                    useFactory: (config: ConfigService) => ({
                        secret: config.get<string>('jwt.secret', 'secret-should-not-have-default'),
                        signOptions: {
                            expiresIn: config.get<string>('jwt.ttl', '60s')
                        }
                    })
                })
            ],
        };
    }
}
