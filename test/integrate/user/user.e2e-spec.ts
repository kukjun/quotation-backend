import {
    Test, TestingModule,
} from "@nestjs/testing";
import {
    AppModule,
} from "../../../src/app.module";
import {
    PrismaService,
} from "../../../src/apps/adaptor/out/persistence/prisma.service";
import {
    setupPrismaService,
} from "../../../src/util/test-help";
import * as request from "supertest";
import {
    CreateUserRequest, CreateUserResponse,
} from "../../../src/apps/application/port/in/create-user.use.case";
import {
    HttpStatus,
} from "@nestjs/common";
import {
    getUserEntityFixture,
} from "../fixture/entity/user-entity.fixture";
import {
    LoginUserRequest, LoginUserResponse,
} from "../../../src/apps/application/port/in/login-user.use.case";
import {
    JwtService,
} from "@nestjs/jwt";

describe("User Controller Test (e2e)", () => {
    let app;
    let prismaService: PrismaService;
    let jwtService: JwtService;

    beforeAll(async () => {
        prismaService = await setupPrismaService();
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule,],
        })
            .overrideProvider(PrismaService)
            .useValue(prismaService)
            .compile();

        jwtService = module.get<JwtService>(JwtService);

        app = module.createNestApplication();
        await app.init();

    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await prismaService.account.deleteMany({});
    });

    describe("createUser Test", () => {
        it("요청이 필수 값을 모두 채우는 경우 유저를 생성하고 생성된 유저를 반환해야 한다.", async () => {
            // given
            const requestBody = new CreateUserRequest(
                "createUserTestId",
                "createUserTestPassword",
                "createUserTestNickname",
                "가장 좋아하는 장소는?",
                "집",
            );

            // when
            const response = await request(app.getHttpServer())
                .post("/users")
                .send(requestBody)
                .expect(HttpStatus.CREATED);

            // then
            const actual = response.body as CreateUserResponse;
            expect(actual.data.id).toEqual(requestBody.id);
        });
    });

    describe("loginUser Test", () => {
        it("loginUser 성공", async () => {
            // given
            const userEntity = await getUserEntityFixture();
            await prismaService.account.create({
                data: userEntity,
            });
            const requestBody = new LoginUserRequest(
                userEntity.id,
                "testPassword",
            );

            // when
            const response = await request(app.getHttpServer())
                .post("/users/login")
                .send(requestBody)
                .expect(HttpStatus.OK);

            // then
            const actual = response.body as LoginUserResponse;
            const accessTokenDecode = jwtService.decode(actual.data.accessToken);
            const refreshTokenDecode = jwtService.decode(actual.data.refreshToken);

            expect(accessTokenDecode.id).toEqual(userEntity.id);
            expect(accessTokenDecode.type).toEqual("accessToken");
            expect(refreshTokenDecode.id).toEqual(userEntity.id);
            expect(refreshTokenDecode.type).toEqual("refreshToken");
        });
    });

});