import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { RequirePermission } from './require-permission-decorator';
import { JwtService } from '@nestjs/jwt';

function extractTokenFromHeader(request: IncomingMessage): string | undefined {
    return request.headers['authorization'];
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector,
                private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        } catch (e) {
            throw new UnauthorizedException();
        }

        const permissions = this.reflector.get(RequirePermission, context.getHandler());
        if (!permissions) {
            // If no permissions are defined on the route then just let anyone
            // who is logged in access it
            return true;
        }

        if (!payload['permissions'].includes(permissions)) {
            throw new ForbiddenException();
        }

        return true;
    }
}
