import {
    NotFoundException,
} from "./http/not-found.exception";
import {
    ConflictException, 
} from "./http/conflict.exception";

export class UserNotFoundException extends NotFoundException {
    constructor(value: string) {
        super(value);
    }
}

export class UserAlreadyExistException extends ConflictException {
    constructor(value: string) {
        super(value);
    }
}