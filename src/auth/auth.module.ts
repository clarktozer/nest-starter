import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { AntiForgeryMiddleware } from './csrf.middleware';
import { FacebookAuthModule } from './facebook/facebook.module';
import { GoogleAuthModule } from './google/google.module';
import { LocalAuthStrategy } from './local/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    GoogleAuthModule,
    FacebookAuthModule,
  ],
  providers: [AuthService, LocalAuthStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AntiForgeryMiddleware).forRoutes(
      {
        path: '/auth/*/redirect',
        method: RequestMethod.GET,
      },
      {
        path: '/auth/login',
        method: RequestMethod.POST,
      },
    );
  }
}
