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

describe("User Controller Test (e2e)", () => {
    let app;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule,],
        })
            .overrideProvider(PrismaService)
            .useValue(await setupPrismaService())
            .compile();

        app = module.createNestApplication();
        await app.init();

    });

    afterAll(async () => {
        await app.close();
    });

    describe("createUser Test", () => {
        it("createUser 성공", async () => {
            // given
            const requestBody = new CreateUserRequest(
                "testId",
                "testPassword",
                "testNickname",
                "가장 좋아하는 장소는?",
                "집"
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

});