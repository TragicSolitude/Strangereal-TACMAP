import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshClaims, TokenClaims } from '../token-claims';

interface LoginResponse {
    refreshToken: string;
    accessToken: string;
}

const seconds = 1000;
const minutes = 60*seconds;
const hours = 60*minutes;
const days = 24*hours;

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService,
                private readonly jwtService: JwtService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
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

        return { refreshToken, accessToken };
    }
}
