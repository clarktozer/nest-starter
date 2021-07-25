import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from '../request.interface';
import { GoogleAuthGuard } from './google.guard';

@Controller('auth/google')
@UseGuards(GoogleAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  @Get()
  async auth() {}

  @Get('redirect')
  redirect(@Req() request: RequestWithUser) {
    return request.user;
  }
}
