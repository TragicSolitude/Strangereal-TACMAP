import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { TokenClaims } from './claims';

export const Claims = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        throw new UnauthorizedException();
    }

    if (!(user instanceof Claims)) {
        console.warn('User value is not instance of token body');
    }

    return user;
});
