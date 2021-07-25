import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { User } from '../../../user/user.entity';
import { UserService } from '../../../user/user.service';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: VerifyCallback) {
    done(null, user.googleId);
  }

  async deserializeUser(userId: string, done: VerifyCallback) {
    try {
      const user = await this.userService.getByGoogleId(userId);
      done(null, user);
    } catch {
      done(null, false);
    }
  }
}
