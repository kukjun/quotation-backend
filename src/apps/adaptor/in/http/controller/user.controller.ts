import {
    Body,
    Controller,
    HttpCode,
    Inject, Param,
    Post, Put,
} from "@nestjs/common";
import {
    CreateUserRequest,
    CreateUserResponse,
    CreateUserUseCase,
    CreateUserUseCaseSymbol,
    CreateUserResponseData,
} from "../../../../application/port/in/create-user.use.case";
import {
    LoginUserRequest, LoginUserResponse,
    LoginUserUseCase,
    LoginUserUseCaseSymbol,
} from "../../../../application/port/in/login-user.use.case";
import {
    UpdateUserRequest, UpdateUserResponse, UpdateUserResponseData,
    UpdateUserUseCase, UpdateUserUseCaseSymbol,
} from "../../../../application/port/in/update-user.use.case";

@Controller("/users")
export class UserController {
    constructor(
    @Inject(CreateUserUseCaseSymbol)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(LoginUserUseCaseSymbol)
    private readonly loginUserUseCase: LoginUserUseCase,
    @Inject(UpdateUserUseCaseSymbol)
    private readonly updateUserUseCase: UpdateUserUseCase,
    ) {
    }

  @Post()
  @HttpCode(201)
    async createUser(
    @Body() request: CreateUserRequest,
    ): Promise<CreateUserResponse> {
        const response = await this.createUserUseCase.createUser(request);

        return new CreateUserResponse(new CreateUserResponseData(response));
    }

  @Post("/login")
  @HttpCode(200)
  async loginUser(
    @Body() request: LoginUserRequest,
  ): Promise<LoginUserResponse> {
      const response = await this.loginUserUseCase.loginUser(request);

      return new LoginUserResponse(response);
  }

  @Put("/:id")
  @HttpCode(200)
  async updateUser(
    @Param("id") id: string,
    @Body() request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
      const response = await this.updateUserUseCase.updateUser(id, request);

      return new UpdateUserResponse(new UpdateUserResponseData(response));
  }
}
