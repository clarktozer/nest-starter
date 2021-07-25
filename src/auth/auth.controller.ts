import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { RegisterUserDto } from 'src/user/dto/registerUserDto';
import { AuthenticatedGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './request.interface';
import { SessionGuard } from './session.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Get()
  @UseGuards(SessionGuard)
  async me(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('logout')
  @UseGuards(SessionGuard)
  logout(@Req() request: RequestWithUser, @Res() response: Response) {
    request.logout();
    request.session.destroy(() => {
      response
        .clearCookie(this.configService.get('session.key'))
        .sendStatus(200);
    });
  }

  @Get('google')
  @UseGuards(AuthenticatedGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthenticatedGuard)
  googleAuthRedirect(@Req() request: RequestWithUser) {
    return this.authService.signInWithGoogle(request.user);
  }
}
