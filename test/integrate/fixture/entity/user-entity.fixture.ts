import {
    UserEntity,
} from "../../../../src/apps/adaptor/out/persistence/entities/user.entity";
import * as bcrypt from "bcrypt";

export const getUserEntityFixture = async (): Promise<UserEntity> => {
    return new UserEntity(
        "testUser",
        await bcrypt.hash("testPassword", await bcrypt.genSalt()),
        "testNickname",
        "question",
        "answer",
        null,
        null,
        null,
        null,
        null,
        new Date(),
        null
    )
    ;

};