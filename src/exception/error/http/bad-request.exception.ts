import {
    HttpException, HttpStatus, 
} from "@nestjs/common";

export class BadRequestException extends HttpException {
    constructor(value: string) {
        super(`${value} Bad Request`,HttpStatus.BAD_REQUEST);
    }
}