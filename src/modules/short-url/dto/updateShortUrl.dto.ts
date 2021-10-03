import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

class UpdateShortUrl {
    @IsString()
    @IsNotEmpty()
    urlHash: string;

    @IsNumber()
    @IsNotEmpty()
    timesCreated: number;
    
    @IsNumber()
    @IsNotEmpty()
    timesAccessed: number;
}

export class UpdateShortUrlDto extends PartialType(UpdateShortUrl) {}