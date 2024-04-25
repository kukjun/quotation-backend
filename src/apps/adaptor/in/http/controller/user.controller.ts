import {
    Body,
    Controller,
    HttpCode,
    Inject,
    Post,
} from "@nestjs/common";
import {
    CreateUserRequest,
    CreateUserResponse,
    CreateUserUseCase,
    CreateUserUseCaseSymbol,
    Data,
} from "../../../../application/port/in/create-user.use.case";

@Controller("/users")
export class UserController {
    constructor(
    @Inject(CreateUserUseCaseSymbol)
    private readonly createUserUseCase: CreateUserUseCase,
    ) {}

  @Post()
  @HttpCode(201)
    async createUser(
    @Body() request: CreateUserRequest,
    ): Promise<CreateUserResponse> {
        const response = await this.createUserUseCase.createUser(request);

        return new CreateUserResponse(new Data(response));
    }
}
