import {
    UserDomain,
} from "../../domain/user.domain";
import {
    CreateUserRequest,
    CreateUserUseCase,
} from "../port/in/create-user.use.case";
import {
    CreateUserPort,
} from "../port/out/create-user.port";
import {
    Inject, Injectable,
} from "@nestjs/common";
import {
    GetUserPort,
} from "../port/out/get-user.port";
import {
    LoginFailException,
    UserAlreadyExistException,
} from "../../../exception/error/user-exception";
import * as bcrypt from "bcrypt";
import {
    LoginUserRequest, LoginUserResponseData,
    LoginUserUseCase,
} from "../port/in/login-user.use.case";
import {
    JwtService, 
} from "@nestjs/jwt";
import {
    ConfigService, 
} from "@nestjs/config";

@Injectable()
export class UserService implements CreateUserUseCase, LoginUserUseCase {
    constructor(
    @Inject("UserAdaptor") private readonly createUserPort: CreateUserPort,
    @Inject("UserAdaptor") private readonly getUserPort: GetUserPort,
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
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

    /**
     * User Login API
     * @param request
     */
    async loginUser(request: LoginUserRequest): Promise<LoginUserResponseData> {
        const user = await this.getUserPort.getUserById(request.id);
        if(!user) throw new LoginFailException("Login Fail");

        if(!await user.isCorrectPassword(request.password)) {
            throw new LoginFailException("Login Fail");
        }

        if(user.isDeleted()) {
            throw new LoginFailException("Login Fail");
        }
        const payload =  {
            id: user.id,
        };

        // JWT Function 찾아서 적용
        const accessToken = this.jwtService.sign({
            type: "accessToken",
            ...payload,
        }, {
            expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRED_TIME"),
            secret: this.configService.get("SECRET_KEY"),
        });
        const refreshToken = this.jwtService.sign({
            type: "refreshToken",
            ...payload,
        }, {
            expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRED_TIME"),
            secret: this.configService.get("SECRET_KEY"),
        });

        return {
            accessToken,
            refreshToken,
        };
    }

}
