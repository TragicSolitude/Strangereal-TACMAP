import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthRepository } from "@strangereal/data-access-api";
import { Observable, catchError, from, switchMap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private readonly authRepository: AuthRepository) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(error => {
                // Don't handle errors from the refresh endpoint
                if (request.url.startsWith('/api/auth/refresh')) {
                    throw error;
                }

                // Refresh the access token on unauthorized errors
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handleUnauthorized(request, next);
                }

                // Pass through all other errors
                throw error;
            })
        )
    }

    private handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return from(this.authRepository.refresh()).pipe(
            switchMap(() => next.handle(request))
        );
    }
}
