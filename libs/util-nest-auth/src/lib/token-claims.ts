import { Permission } from '@strangereal/util-constants';

export enum TokenType {
    Access = 1,
    Refresh = 2
}

// TODO setup refresh tokens
export class TokenClaims {
    constructor(private readonly sub: string,
                private readonly per: Permission[]) {}

    static fromJwtPayload(payload: object): TokenClaims {
        if (!('sub' in payload) || typeof payload['sub'] !== 'string') {
            // TODO Enumerated errors
            throw new Error('Invalid payload');
        }

        if (!('per' in payload) || !Array.isArray(payload['per'])) {
            // TODO Enumerated errors
            throw new Error('Invalid payload');
        }

        for (const permission of payload['per']) {
            // TODO Check that each value is a valid permission key
            if (typeof permission !== 'number') {
                // TODO Enumerated errors
                throw new Error('Invalid payload');
            }
        }

        return new TokenClaims(payload['sub'], payload['per']);
    }

    /**
     * @throws Error if the subject is not a number
     */
    getUserId(): number {
        const userId = Number(this.sub);
        if (isNaN(userId)) {
            // TODO enumerated error
            throw new Error('Subject of this token is not a valid user ID');
        }

        return userId;
    }

    getPermissions(): Permission[] {
        return this.per;
    }

    hasPermission(permissions: Permission): boolean {
        return this.per.includes(permissions);
    }
}
