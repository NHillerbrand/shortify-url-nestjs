import { IsNotEmpty, IsString } from "class-validator";

export class CreateShortUrlDto {

    @IsString()
    @IsNotEmpty()
    longUrl: string;

    @IsString()
    urlHash?: string;
}