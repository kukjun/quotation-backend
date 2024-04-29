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
import {
    UpdateUserRequest, UpdateUserResponse,
} from "../../../src/apps/application/port/in/update-user.use.case";
import {
    ErrorData,
} from "../../../src/exception/error/error-data";
import {
    HttpExceptionFilter,
} from "../../../src/filter/http-exception.filter";

describe("User Controller Test (e2e)", () => {
    let app;
    let prismaService: PrismaService;
    let jwtService: JwtService;

    beforeAll(async () => {
    // DB Conatiner와 연결된 prismaService 생성
        prismaService = await setupPrismaService();

        // 테스트를 시작할 때, Test Container를 사용하는 PrismaService를 주입받음
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule,],
        })
            .overrideProvider(PrismaService)
            .useValue(prismaService)
            .compile();

        jwtService = module.get<JwtService>(JwtService);
        app = module.createNestApplication();
        app.useGlobalFilters(new HttpExceptionFilter());
        await app.init();

    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await prismaService.account.deleteMany({});
    });

    describe("createUser Test", () => {
        it("요청이 필수 값을 모두 채우는 경우 유저를 생성하고 생성된 유저의 id를 반환해야 한다.", async () => {
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
        it("id, password가 일치하는 사용자가 있으면 해당하는 user를 인증할 수 있는 토큰을 제공해야 한다.", async () => {
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

        it("id, password가 일치하지 않는 사용자라면, 로그인을 할 수 없다는 예외를 발생시켜야 한다.", async () => {
            // given
            const nonExistUserId = "nonExistUser";
            const requestBody = new LoginUserRequest(
                nonExistUserId,
                "testPassword",
            );

            const expectedPath = "/users/login";
            const expectedStatus = HttpStatus.BAD_REQUEST;
            const expectedError = HttpStatus[expectedStatus];

            // when
            const response = await request(app.getHttpServer())
                .post("/users/login")
                .send(requestBody)
                .expect(HttpStatus.BAD_REQUEST);

            // then
            const actual = response.body as ErrorData;
            expect(actual.data.path).toEqual(expectedPath);
            expect(actual.data.status).toEqual(expectedStatus);
            expect(actual.data.error).toEqual(expectedError);

        });
    });

    describe("updateUser Test", () => {
        it("변경 가능한 모든 값들을 한번에 변경하면, 모두 변경된다.", async () => {
            // given
            const userEntity = await getUserEntityFixture();
            await prismaService.account.create({
                data: userEntity,
            });
            const expectedNickname = "updatedNickname";
            const expectedProfilePath = "updatedProfile";
            const expectedFavoriteQuotation = "updatedFavoriteQuotation";
            const expectedFavoriteAuthor = "updatedFavoriteAuthor";
            const expectedQuotationAlarm = true;
            const expectedCommentAlarm = true;
            const expectedIdentityVerificationQuestion = "updatedIdentityVerificationQuestion";
            const expectedIdentityVerificationAnswer = "updatedIdentityVerificationAnswer";
            const requestBody = new UpdateUserRequest(
                expectedNickname,
                expectedIdentityVerificationQuestion,
                expectedIdentityVerificationAnswer,
                expectedProfilePath,
                expectedFavoriteQuotation,
                expectedFavoriteAuthor,
                expectedQuotationAlarm,
                expectedCommentAlarm,
            );

            // when
            const response = await request(app.getHttpServer())
                .put(`/users/${userEntity.id}`)
                .send(requestBody)
                .expect(HttpStatus.OK);

            // then
            const actual = response.body as UpdateUserResponse;
            expect(actual.data.id).toEqual(userEntity.id);

            const accountInfo = await prismaService.account.findUnique({
                where: {
                    id: actual.data.id,
                },
            });
            expect(accountInfo.nickname).toEqual(expectedNickname);
            expect(accountInfo.profilePath).toEqual(expectedProfilePath);
            expect(accountInfo.favoriteQuotation).toEqual(expectedFavoriteQuotation);
            expect(accountInfo.favoriteAuthor).toEqual(expectedFavoriteAuthor);
            expect(accountInfo.quotationAlarm).toEqual(expectedQuotationAlarm);
            expect(accountInfo.commentAlarm).toEqual(expectedCommentAlarm);
            expect(accountInfo.identityVerificationQuestion).toEqual(expectedIdentityVerificationQuestion);
            expect(accountInfo.identityVerificationAnswer).toEqual(expectedIdentityVerificationAnswer);
        });

        it("존재하지 않는 User의 정보를 변경하려고 하면 유저를 찾을 수 없다는 예외가 발생한다.", async () => {
            // given
            const nonExistUser = "nonExistUser";
            const expectedNickname = "updatedNickname";
            const requestBody = new UpdateUserRequest(
                expectedNickname,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
            );

            const expectedPath = `/users/${nonExistUser}`;
            const expectedStatus = HttpStatus.NOT_FOUND;
            const expectedError = HttpStatus[expectedStatus];

            // when
            const response = await request(app.getHttpServer())
                .put(`/users/${nonExistUser}`)
                .send(requestBody)
                .expect(HttpStatus.NOT_FOUND);

            // then
            const actual = response.body as ErrorData;
            expect(actual.data.path).toEqual(expectedPath);
            expect(actual.data.status).toEqual(expectedStatus);
            expect(actual.data.error).toEqual(expectedError);

        });
    });

});