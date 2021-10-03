import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import {ConfigModule} from './config/config.module';
import { ShortUrlModule } from './modules/short-url/short-url.module';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    ShortUrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
