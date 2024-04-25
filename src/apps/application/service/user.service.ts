import {
    UserDomain,
} from "../../domain/user.domain";
import {
    CreateUserRequest,
    CreateUserUseCase,
} from "../port/in/create-user.use.case";
import {
    CreateUserPort,
} from "../port/out/./create-user.port";
import {
    Inject, Injectable,
} from "@nestjs/common";
import {
    GetUserPort,
} from "../port/out/get-user.port";
import {
    UserAlreadyExistException,
} from "../../../exception/error/user-exception";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService implements CreateUserUseCase {
    constructor(
    @Inject("UserAdaptor") private readonly createUserPort: CreateUserPort,
    @Inject("UserAdaptor") private readonly getUserPort: GetUserPort,
    ) {
    }

    /**
   * User 생성 API
   * @param request 유저 회원가입을 위한 요청정보
   */
    async createUser(request: CreateUserRequest): Promise<string> {
        const existUserById = await this.getUserPort.getUserById(request.id);
        if (existUserById) throw new UserAlreadyExistException(`id: ${request.id} User Exist`);

        const existUserByNickname = await this.getUserPort.getUserByNickname(request.nickname);
        if (existUserByNickname) throw new UserAlreadyExistException(`nickname: ${request.nickname} User Exist`);

        const encryptedPassword = await bcrypt.hash(request.password, await bcrypt.genSalt());
        const user = UserDomain.create(
            request.id,
            encryptedPassword,
            request.nickname,
            request.identityVerificationQuestion,
            request.identityVerificationAnswer,
        );

        return await this.createUserPort.createUser(user);
    }
}
