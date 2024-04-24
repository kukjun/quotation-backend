import {
    NotFoundException, 
} from "./http/not-found.exception";

export class UserNotFoundException extends NotFoundException {
    constructor(value: string) {
        super(value);
    }
}