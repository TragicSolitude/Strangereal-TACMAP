import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AuthRepository {
    constructor(private readonly http: HttpClient) {}

    async login(username: string): Promise<void> {
        const request = this.http.post('/api/auth/login', { username });
        await firstValueFrom(request);
    }

    async refresh(): Promise<void> {
        const request = this.http.post('/api/auth/refresh', undefined);
        await firstValueFrom(request);
    }
}
