import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login a user and return a JWT token' })
    @ApiBody({ type: LoginRequestBody })
    async login(@Request() req: AuthRequest) {
        console.log(req.user);
        return this.authService.login(req.user);
    }
}