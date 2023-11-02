import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
    provideRouter,
    withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { DataAccessApiModule } from '@strangereal/data-access-api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utils/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideAnimations(),
        importProvidersFrom(DataAccessApiModule),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
};
