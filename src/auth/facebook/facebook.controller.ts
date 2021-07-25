import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from '../request.interface';
import { FacebookAuthGuard } from './facebook.guard';

@Controller('auth/facebook')
@UseGuards(FacebookAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class FacebookAuthController {
  @Get()
  async auth() {}

  @Get('redirect')
  redirect(@Req() request: RequestWithUser) {
    return request.user;
  }
}
