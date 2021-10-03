import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { InternalServerErrorException } from "@nestjs/common";
import { ShortUrl } from "src/entities/shortUrl.entity";
import { CreateShortUrlDto } from "src/modules/short-url/dto/createShortUrl.dto";
import { UpdateShortUrlDto } from 'src/modules/short-url/dto/updateShortUrl.dto'

export class ShortUrlRepository {
    constructor(
        @InjectModel(ShortUrl.name)
        private readonly shortUrlModel: Model<ShortUrl>
    ) {}

    async getUrlByHash(urlHash: string ) {
        try {
            const shortUrl = await this.shortUrlModel.findById({urlHash}).exec();
            return shortUrl;
        } catch(error) {
            throw new InternalServerErrorException(`No registered URL found for hash, hash=${urlHash}`, error);
        }
    }

    async createShortUrl(createShortUrlDto: CreateShortUrlDto) {
        const shortUrlExists: any = await this.getUrlByHash(createShortUrlDto.urlHash);

        if(shortUrlExists.ok) {
            const {timesCreated} = shortUrlExists;
            this.updateShortUrl({timesCreated: timesCreated + 1})
            return shortUrlExists;
        } 

        const newShortUrl = new this.shortUrlModel({
            ...createShortUrlDto,
            timesCreated: 1,
            timesAccessed: 0,
        });

        try {
            const createdShortUrl = await newShortUrl.save();
            return createdShortUrl;
        } catch(error) {
            throw new InternalServerErrorException('Error occured during accessing db', error);
        }
    }

    async updateShortUrl(updateShortUrlDto: UpdateShortUrlDto) {
        const {urlHash, timesAccessed, timesCreated} = updateShortUrlDto;
        try {
            await this.shortUrlModel.findOneAndUpdate({urlHash}, {timesAccessed, timesCreated}).exec();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}