import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { AuthCookieGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './request.interface';
import { LocalAuthGuard } from './strategies/local/local.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Get()
  @UseGuards(AuthCookieGuard)
  async me(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('logout')
  @UseGuards(AuthCookieGuard)
  async logout(@Req() request: RequestWithUser) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
