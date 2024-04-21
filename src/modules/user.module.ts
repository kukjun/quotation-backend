import {
    Global, Module, 
} from "@nestjs/common";
import {
    UserController, 
} from "../apps/adaptor/in/http/controller/user.controller";
import {
    UserService, 
} from "../apps/application/service/user.service";
import {
    PrismaService, 
} from "../prisma.service";
import {
    UserAdaptor, 
} from "../apps/adaptor/out/persistence/adaptor/user.adaptor";
import {
    UserRepository, 
} from "../apps/adaptor/out/persistence/repository/user.repository";
import {
    CreateUserUseCaseSymbol, 
} from "../apps/application/port/in/create.user.use.case";

@Global()
@Module({
    controllers: [UserController,],
    providers: [
        PrismaService,
        UserAdaptor,
        UserRepository,
        {
            provide: UserService,
            useFactory: (userAdaptor) => {
                return new UserService(userAdaptor);
            },
            inject: [UserAdaptor,],
        },
        {
            provide: CreateUserUseCaseSymbol,
            useFactory: (userService) => {
                return userService;
            },
            inject: [UserService,],
        },
    ],
})
export class UserModule {}
