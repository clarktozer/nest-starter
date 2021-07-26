import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Action, AppAbility, Subject } from './casl.interface';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability);

    if (user.isAdmin) {
      can(Action.Manage, Subject.All);
    } else {
      can(Action.Read, Subject.All);
    }

    return build();
  }
}
