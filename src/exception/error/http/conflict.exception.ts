import {
    HttpException, HttpStatus, 
} from "@nestjs/common";

export class ConflictException extends HttpException {
    constructor(value: string) {
        super(`${value} Conflict`, HttpStatus.CONFLICT);
    }
}