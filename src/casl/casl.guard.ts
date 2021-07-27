import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/auth/request.interface';
import { AUTHORIZED_KEY } from './casl.decorator';
import { CaslAbilityFactory } from './casl.factory';
import {
  AppAbility,
  AuthorizationHandler,
  AuthorizationMap,
  Subject,
} from './casl.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = this.reflector.get<AuthorizationHandler>(
      AUTHORIZED_KEY,
      context.getHandler(),
    );

    if (!handler) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestWithUser>();

    if (!user) {
      return false;
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    if (typeof handler === 'function') {
      return handler(ability);
    }

    return this.executePermissionMap(ability, handler);
  }

  private executePermissionMap(
    ability: AppAbility,
    permissions: AuthorizationMap[],
  ) {
    const ands = permissions.map(permission =>
      Object.keys(permission).every((subject: Subject) =>
        ability.can(permission[subject], subject),
      ),
    );

    return ands.some(Boolean);
  }
}
