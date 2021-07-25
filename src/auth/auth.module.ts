import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
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
export class AuthModule {}
