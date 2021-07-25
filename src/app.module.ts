import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Configuration } from './config/configuration';
import { ConfigValidationSchema } from './config/validation';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [Configuration],
      validationSchema: ConfigValidationSchema,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
