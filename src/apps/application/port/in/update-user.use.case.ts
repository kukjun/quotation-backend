export const UpdateUserUseCaseSymbol = Symbol("UpdateUserUseCase");

export interface UpdateUserUseCase {
  updateUser(id: string, request: UpdateUserRequest): Promise<string>;
}

export class UpdateUserRequest {
    constructor(
    readonly nickname: string,
    readonly identityVerificationQuestion: string,
    readonly identityVerificationAnswer: string,
    readonly profilePath: string,
    readonly favoriteQuotation: string,
    readonly favoriteAuthor: string,
    readonly commentAlarm: boolean,
    readonly quotationAlarm: boolean,
    ) {
    }
}

export class UpdateUserResponse {
    constructor(readonly data: UpdateUserResponseData) {
    }
}

export class UpdateUserResponseData {
    constructor(readonly id: string) {
    }
}