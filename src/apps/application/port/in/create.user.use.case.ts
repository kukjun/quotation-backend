export const CreateUserUseCaseSymbol = Symbol("CreateUserUseCase");
export interface CreateUserUseCase {
  createUser(request: CreateUserRequest): Promise<string>;
}

export class CreateUserRequest {
    constructor(
    readonly id: string,
    readonly password: string,
    readonly nickname: string,
    readonly identityVerificationQuestion: string,
    readonly identityVerificationAnswer: string,
    ) {}
}

export class CreateUserResponse {
    constructor(readonly data: Data) {}
}

export class Data {
    constructor(readonly id: string) {}
}
