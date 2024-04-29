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
} from "../apps/adaptor/out/persistence/prisma.service";
import {
    UserAdaptor, 
} from "../apps/adaptor/out/persistence/adaptor/user.adaptor";
import {
    UserRepository, 
} from "../apps/adaptor/out/persistence/repository/user.repository";
import {
    CreateUserUseCaseSymbol, 
} from "../apps/application/port/in/create-user.use.case";
import {
    LoginUserUseCaseSymbol, 
} from "../apps/application/port/in/login-user.use.case";
import {
    JwtModule, JwtService,
} from "@nestjs/jwt";
import {
    ConfigModule, ConfigService, 
} from "@nestjs/config";
import {
    UpdateUserUseCaseSymbol, 
} from "../apps/application/port/in/update-user.use.case";

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule,],
            inject: [ConfigService,],
            useFactory: () => {
                return {
                    signOptions: {},
                };
            },
        }
        ),
    ],
    controllers: [UserController,],
    providers: [
        PrismaService,
        UserAdaptor,
        UserRepository,
        {
            provide: UserService,
            useFactory: (userAdaptor, jwtService, configService) => {
                return new UserService(userAdaptor, userAdaptor, userAdaptor, jwtService, configService);
            },
            inject: [
                UserAdaptor,
                JwtService,
                ConfigService,
            ],
        },
        {
            provide: CreateUserUseCaseSymbol,
            useFactory: (userService) => userService,
            inject: [UserService,],
        },
        {
            provide: LoginUserUseCaseSymbol,
            useFactory: userService => userService,
            inject: [UserService,],
        },
        {
            provide: UpdateUserUseCaseSymbol,
            useFactory: userService => userService,
            inject: [UserService,],
        },
    ],
})
export class UserModule {}
