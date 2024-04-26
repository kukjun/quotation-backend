
export const LoginUserUseCaseSymbol = Symbol("LoginUserUseCase");

export interface LoginUserUseCase {
  loginUser(request: LoginUserRequest): Promise<LoginUserResponseData>;
}

export class LoginUserRequest {
    constructor(
    readonly id: string,
    readonly password: string,
    ) {
    }
}

export class LoginUserResponse {
    constructor(readonly data: LoginUserResponseData) {}
}

export class LoginUserResponseData {
    constructor(
    readonly accessToken: string,
    readonly refreshToken: string
    ) {
    }
}