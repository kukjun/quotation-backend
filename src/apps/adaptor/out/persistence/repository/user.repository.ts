import {
    PrismaService, 
} from "../../../../../prisma.service";
import {
    Account, 
} from "@prisma/client";
import {
    UserEntity, 
} from "../entities/user.entity";
import {
    Injectable, 
} from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    async findById(id: string): Promise<UserEntity | null> {
        const account = await this.prismaService.account.findUnique({
            where: {
                id: id, 
            },
        });

        if (!account) {
            return null;
        } else {
            const entity = new UserEntity(
                account.id, account.password, account.nickname, account.profilePath, account.favoriteQuotation, account.favoriteAuthor, account.commentAlarm, account.quotationAlarm, account.createdTime, account.lastModifiedTime, account.identityVerificationQuestion, account.identityVerificationAnswer,
            );
        }
    }

    async createUser(userEntity: UserEntity): Promise<string> {
        const account = await this.prismaService.account.create({
            data: userEntity,
        });

        return account.id;
    }
}
