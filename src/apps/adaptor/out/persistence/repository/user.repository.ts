import {
    PrismaService, 
} from "../../../../../prisma.service";
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
            return new UserEntity(
                account.id,
                account.password,
                account.nickname,
                account.identityVerificationQuestion,
                account.identityVerificationAnswer,
                account.profilePath,
                account.favoriteQuotation,
                account.favoriteAuthor,
                account.commentAlarm,
                account.quotationAlarm,
                account.createdTime,
                account.lastModifiedTime,
            );
        }
    }

    async findByNickname(nickname: string): Promise<UserEntity | null> {
        const account = await this.prismaService.account.findUnique({
            where: {
                nickname: nickname,
            },
        });
        if(!account) return null;
        else return new UserEntity(
            account.id,
            account.password,
            account.nickname,
            account.identityVerificationQuestion,
            account.identityVerificationAnswer,
            account.profilePath,
            account.favoriteQuotation,
            account.favoriteAuthor,
            account.commentAlarm,
            account.quotationAlarm,
            account.createdTime,
            account.lastModifiedTime,
        );
    }

    async createUser(userEntity: UserEntity): Promise<string> {
        const account = await this.prismaService.account.create({
            data: userEntity,
        });

        return account.id;
    }
}
