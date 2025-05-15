import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { UserDto, IsUserLoggedResponseDto, LoginDto, LoginResponseDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/auth/auth.decorator';
import { StatusDecorator } from 'src/status/status.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: UserDto })
    @ApiResponse({
        status: 200,
        type: LoginResponseDto
    })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @JwtAuth()
    @Get('check')
    @ApiResponse({
        status: 200,
        type: IsUserLoggedResponseDto
    })
    @StatusDecorator()
    async check(@Request() req) {
        return {
            logged: !!req.user
        }
    }
}