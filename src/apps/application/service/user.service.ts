import {
    User, 
} from "../../domain/user";
import {
    CreateUserRequest,
    CreateUserUseCase,
} from "../port/in/create.user.use.case";
import {
    CreateUserPort, 
} from "../port/out/create.user.port";
import {
    Inject, Injectable, 
} from "@nestjs/common";

@Injectable()
export class UserService implements CreateUserUseCase {
    constructor(
    @Inject("UserAdaptor") private readonly createUserPort: CreateUserPort,
    ) {}

    async createUser(request: CreateUserRequest): Promise<string> {
        const user = new User(
            request.id, request.password, request.nickname, request.identityVerificationAnswer, request.identityVerificationAnswer, null, null, null, null, null, null, null,
        );

        return await this.createUserPort.createUser(user);
    }
}
