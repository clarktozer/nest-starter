import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google/google.strategy';
import { LocalSerializer } from './strategies/local/local.serializer';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, LocalSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
