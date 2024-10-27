import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {LoggerModule} from 'nestjs-pino'
import {HelpersModule} from './shared/helpers/helpers.module'

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true
  }),
  UserModule,
  AuthModule,
  HelpersModule,
  LoggerModule.forRoot({
    pinoHttp: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
        },
      },
    },
  }),
  MongooseModule.forRoot(process.env.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
