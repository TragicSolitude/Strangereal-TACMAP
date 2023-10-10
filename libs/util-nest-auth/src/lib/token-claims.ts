import { Permission } from '@strangereal/util-constants';

export class TokenClaims {
    constructor(private readonly uid: number,
                private readonly per: Permission[]) {}

    get userId(): number {
        return this.uid;
    }

    get permissions(): Permission[] {
        return this.per;
    }

    static fromJwtPayload(payload: object): TokenClaims {
        if (!('uid' in payload) || typeof payload['uid'] !== 'number') {
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

        return new TokenClaims(payload['uid'], payload['per']);
    }

    hasPermission(permissions: Permission): boolean {
        return this.per.includes(permissions);
    }
}
