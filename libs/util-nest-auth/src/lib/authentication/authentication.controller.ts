import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshClaims, TokenClaims } from '../token-claims';
import { FastifyReply, FastifyRequest } from 'fastify';

// Import the types for FastifyReply
import '@fastify/cookie';

const seconds = 1000;
const minutes = 60*seconds;
const hours = 60*minutes;
const days = 24*hours;

// These options cannot change without clearing the old cookies first somehow
const accessTokenCookieOptions = {
    signed: false,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
    secure: false,
    maxAge: 60
} as const;

const refreshTokenCookieOptions = {
    signed: false,
    sameSite: 'strict',
    httpOnly: true,
    // TODO get global prefix from application
    path: '/api/auth',
    secure: false,
    // Adjust seconds due to JS milliseconds shenanigans
    maxAge: 30*days/seconds
} as const;

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService,
                private readonly jwtService: JwtService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto,
                @Res({ passthrough: true }) response: FastifyReply): Promise<void> {
        const username = loginDto.username;
        const password = 'default-password';

        const user = await this.authenticationService.findLogin(username, password);
        if (!user) {
            throw new NotFoundException();
        }

        const claims = new TokenClaims(user.id.toString(), user.permissions);
        const accessToken = this.jwtService.sign(claims.toJwtPayload());

        const refreshClaims = new RefreshClaims(user.id.toString());
        const refreshToken = this.jwtService.sign(refreshClaims.toJwtPayload(), {
            expiresIn: 30*days
        });

        // TODO Make this platform-independent

        // TODO switch secure value depending on something I guess?

        // The tokens are already signed no need to sign them again
        response.setCookie('access-token', accessToken, accessTokenCookieOptions);
        response.setCookie('refresh-token', refreshToken, refreshTokenCookieOptions);
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Req() request: FastifyRequest,
                  @Res({ passthrough: true }) response: FastifyReply): Promise<void> {
        const refreshToken = request.cookies['refresh-token'];
        if (!refreshToken) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken);
            if (!payload) {
                throw new Error();
            }

            // TODO verify user is still valid
            const claims = RefreshClaims.fromJwtPayload(payload);
            const user = await this.authenticationService.findUserById(claims.getUserId());
            if (!user) {
                throw new Error();
            }

            const accessTokenClaims = new TokenClaims(user.id.toString(), user.permissions);
            const accessToken = this.jwtService.sign(accessTokenClaims.toJwtPayload());

            response.setCookie('access-token', accessToken, accessTokenCookieOptions);
        } catch (_error) {
            // Options must be the same as when originally set
            response.clearCookie('access-token', accessTokenCookieOptions);
            response.clearCookie('refresh-token', refreshTokenCookieOptions);
            throw new UnauthorizedException();
        }

        // const accessToken
        // response.setCookie('access-token', accessToken, {
        //     ...cookieOptions,
        //     maxAge: 60
        // })
    }
}
