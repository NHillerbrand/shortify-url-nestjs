import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { CreateShortUrlDto } from './dto/createShortUrl.dto';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
    constructor(private shortUrlService: ShortUrlService) {}

    @Get('/:hashUrl')
    async redirectToLongUrl(@Param('hashUrl') hashUrl: string, @Res() res: any) {
        this.shortUrlService.getRedirectUrlByHash(hashUrl).then((responseDto: ResponseDto) => {
            const {data, status, message} = responseDto;
            if(message) {
                return res.status(status).json(message);
            }
            return res.redirect(data.longUrl);
        })
    }

    @Post('/')
    async createUrlHash(@Body() createShortUrlDto: CreateShortUrlDto,  @Res() res: any) {
        this.shortUrlService.createShortUrl(createShortUrlDto.longUrl).then((responseDto: ResponseDto) => {
            const {data, status, message} = responseDto;
            if(message) {
                return res.status(status).json(message);
            }
            return res.status(status).send(data);
        })
    }
}
