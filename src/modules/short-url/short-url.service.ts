import { HttpStatus, Injectable } from '@nestjs/common';
import shortid from 'shortid';
import validUrl from 'valid-url';

import { ResponseDto } from 'src/dto/response.dto';
import { ShortUrl } from 'src/entities/shortUrl.entity';
import { ShortUrlRepository } from 'src/repositories/shortUrl.repository';


@Injectable()
export class ShortUrlService {
    constructor(private readonly shortUrlRepository: ShortUrlRepository) {}

    async getRedirectUrlByHash(urlHash: string): Promise<ResponseDto> {
        const shortUrl: any = await this.shortUrlRepository.getUrlByHash(urlHash);
        if(shortUrl.ok) {
            const {timesAccessed, timesCreated, longUrl} = shortUrl as ShortUrl;
            this.shortUrlRepository.updateShortUrl({
                urlHash,
                timesCreated, 
                timesAccessed: timesAccessed + 1
                }
            );
            const data = {longUrl};
            return {data, status: HttpStatus.OK};
        }
        return {status: HttpStatus.NOT_FOUND};
    }

    async createShortUrl(longUrl: string): Promise<ResponseDto> {
        if(!validUrl.isUri(longUrl)) {
            return {status: HttpStatus.BAD_REQUEST, message: 'Invalid Requestparameter: url'}
        }
        const urlHash = shortid.generate();
        const data: any = this.shortUrlRepository.createShortUrl({urlHash, longUrl});
        if(!data.ok) {
            return {status: HttpStatus.BAD_REQUEST, message: 'Create UrlHash failed'};
        }
        return {data, status: HttpStatus.CREATED};
    }




}
