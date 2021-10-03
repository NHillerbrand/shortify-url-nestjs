import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlSchema } from 'src/entities/shortUrl.entity';
import { ShortUrlRepository } from 'src/repositories/shortUrl.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShortUrl.name, schema: ShortUrlSchema }]),
  ],
  providers: [ShortUrlService, ShortUrlRepository],
  controllers: [ShortUrlController]
})
export class ShortUrlModule {}
