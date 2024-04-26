import {
    NotFoundException,
} from "./http/not-found.exception";
import {
    ConflictException, 
} from "./http/conflict.exception";
import {
    BadRequestException, 
} from "./http/bad-request.exception";

export class UserNotFoundException extends NotFoundException {
    constructor(value: string) {
        super(value);
    }
}

export class LoginFailException extends BadRequestException {
    constructor(value: string) {
        super(value);
    }
}

export class UserAlreadyExistException extends ConflictException {
    constructor(value: string) {
        super(value);
    }
}