import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

interface LoginResponse {
    refreshToken: string;
    accessToken: string;
}

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
            throw new BadRequestException();
        }

        return { refreshToken: 'get', accessToken: 'fucked' };
    }
}
