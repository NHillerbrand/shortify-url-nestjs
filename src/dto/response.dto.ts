import { HttpStatus } from "@nestjs/common"

interface ResponseData {
    longUrl: string 
    urlHash?: string 
    timesCreated?: number 
    timesAccessed?: number 
    createdAt?: Date;
}

export class ResponseDto {
    status: HttpStatus;
    data?: ResponseData;
    message?: string;
}