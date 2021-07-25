import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { VerifyCallback } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FacebookAuthStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('facebook.clientId'),
      clientSecret: configService.get<string>('facebook.clientSecret'),
      callbackURL: configService.get<string>('facebook.callbackURL'),
      scope: 'email',
      profileFields: ['id', 'email', 'displayName', 'picture'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const newUser: CreateUserDto = {
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        avatar: profile.photos ? profile.photos[0].value : '',
      };

      let user = await this.userService.getByFacebookId(newUser.facebookId);

      if (!user) {
        user = await this.userService.create(newUser);
      }

      done(null, user);
    } catch {
      done(null, false);
    }
  }
}
