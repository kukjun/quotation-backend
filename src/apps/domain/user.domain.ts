/**
 * @property id 식별자
 * @property password 비밀번호
 * @property nickname 닉네임
 * @property profilePath 프로필 경로
 * @property favoriteAuthor 가장 좋아하는 저자
 * @property favoriteQuotation 가장 좋아하는 명언
 * @property commentAlarm 댓글 알람
 * @property quotationAlarm 명언 알람
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 * @property identityVerificationQuestion 본인 확인 질문
 * @property identityVerificationAnswer 본인 확인 답변
 */
import {
    UserEntity,
} from "../adaptor/out/persistence/entities/user.entity";

export class UserDomain {
    constructor(
    private id: string,
    private password: string,
    private nickname: string,
    private identityVerificationQuestion: string,
    private identityVerificationAnswer: string,
    private profilePath: string,
    private favoriteQuotation: string,
    private favoriteAuthor: string,
    private commentAlarm: boolean,
    private quotationAlarm: boolean,
    private createdTime: Date,
    private lastModifiedTime: Date,

    ) {
    }

    toEntity(): UserEntity {
        return new UserEntity(
            this.id,
            this.password,
            this.nickname,
            this.identityVerificationQuestion,
            this.identityVerificationAnswer,
            this.profilePath,
            this.favoriteQuotation,
            this.favoriteAuthor,
            this.commentAlarm,
            this.quotationAlarm,
            this.createdTime,
            this.lastModifiedTime,
        );
    }

    static create(
        id: string,
        password: string,
        nickname: string,
        identityVerificationQuestion: string,
        identityVerificationAnswer: string,
        profilePath: string = null,
        favoriteQuotation: string = null,
        favoriteAuthor: string = null,
        commentAlarm: boolean = false,
        quotationAlarm: boolean = false,
        createdTime: Date = new Date(),
        lastModifiedTime: Date = null,

    ): UserDomain {
        return new UserDomain(
            id,
            password,
            nickname,
            identityVerificationQuestion,
            identityVerificationAnswer,
            profilePath,
            favoriteQuotation,
            favoriteAuthor,
            commentAlarm,
            quotationAlarm,
            createdTime,
            lastModifiedTime,
        );

    }
}
