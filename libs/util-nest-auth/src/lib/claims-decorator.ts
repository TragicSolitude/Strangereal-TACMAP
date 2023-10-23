import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { TokenClaims } from './token-claims';

export const Claims = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const claims = request.claims;
    if (!claims) {
        throw new UnauthorizedException();
    }

    if (!(claims instanceof TokenClaims)) {
        console.warn('Token claims is not an instance of token claims class');
    }

    return claims;
});
