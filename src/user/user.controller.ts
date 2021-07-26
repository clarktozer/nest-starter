import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionGuard } from '../auth/session.guard';
import { Authorized } from '../casl/casl.decorator';
import { AuthorizationGuard } from '../casl/casl.guard';
import { Action, Subject } from '../casl/casl.interface';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthorizationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(SessionGuard)
  @Authorized(ability => ability.can(Action.Manage, Subject.All))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(SessionGuard)
  @Authorized([
    {
      [Subject.All]: Action.Manage,
    },
  ])
  findById(@Param() id: string) {
    return this.userService.getById(id);
  }
}
