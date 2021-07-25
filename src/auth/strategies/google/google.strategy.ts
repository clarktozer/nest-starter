import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../../../user/dto/createUserDto';
import { AuthService } from '../../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('google.clientId'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const newUser: CreateUserDto = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        avatar: profile.photos ? profile.photos[0].value : '',
      };

      let user = await this.userService.getByGoogleId(newUser.googleId);

      if (!user) {
        user = await this.userService.create(newUser);
      }

      done(null, user);
    } catch {
      done(null, false);
    }
  }
}
