import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { RequirePermission } from './require-permission-decorator';
import { JwtService } from '@nestjs/jwt';
import { TokenClaims, TokenType } from './token-claims';

const parseAuthorization = /^(?<type>bearer)\s+(?<value>[A-z0-9._-]+)$/i;

/**
 * Extracts the auth token out of the authorization header
 *
 * NOTE: Currently only works with Bearer JWTs but may be changed in the future
 * to support other authentication mechanisms for some reason.
 */
function extractTokenFromHeader(request: IncomingMessage): string | undefined {
    const authorization = request.headers['authorization'];
    if (!authorization) {
        return undefined;
    }

    const result = parseAuthorization.exec(authorization);
    if (!result || !result.groups) {
        return undefined;
    }

    const { type, value } = result.groups;
    // In the future this could work with other authorization types
    if (type.toLowerCase() !== 'bearer') {
        return undefined;
    }

    return value;
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
        let claims: TokenClaims;
        try {
            const payload = await this.jwtService.verifyAsync(token);
            // TODO internalize this into some token base class/factory
            if ('tty' in payload && payload.tty !== TokenType.Access) {
                throw new Error();
            }
            claims = TokenClaims.fromJwtPayload(payload);
            request['claims'] = claims;
        } catch (e) {
            throw new UnauthorizedException();
        }

        const permissions = this.reflector.get(RequirePermission, context.getHandler());
        if (!permissions) {
            // If no permissions are defined on the route then just let anyone
            // who is logged in access it
            return true;
        }

        if (claims.hasPermission(permissions)) {
            throw new ForbiddenException();
        }

        return true;
    }
}
