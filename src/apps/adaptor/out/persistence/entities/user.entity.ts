import {
    Account,
} from "@prisma/client";
import {
    UserDomain,
} from "../../../../domain/user.domain";

export class UserEntity implements Account {
  id: string;
  password: string;
  nickname: string;
  identityVerificationQuestion: string | null;
  identityVerificationAnswer: string | null;
  profilePath: string | null;
  favoriteQuotation: string | null;
  favoriteAuthor: string | null;
  commentAlarm: boolean | null;
  quotationAlarm: boolean | null;
  createdTime: Date | null;
  lastModifiedTime: Date | null;

  constructor(
      id: string,
      password: string,
      nickname: string,
      identityVerificationQuestion: string | null,
      identityVerificationAnswer: string | null,
      profilePath: string | null,
      favoriteQuotation: string | null,
      favoriteAuthor: string | null,
      commentAlarm: boolean | null,
      quotationAlarm: boolean | null,
      createdTime: Date | null,
      lastModifiedTime: Date | null,
  ) {
      this.id = id;
      this.password = password;
      this.nickname = nickname;
      this.profilePath = profilePath;
      this.favoriteQuotation = favoriteQuotation;
      this.favoriteAuthor = favoriteAuthor;
      this.commentAlarm = commentAlarm;
      this.quotationAlarm = quotationAlarm;
      this.createdTime = createdTime;
      this.lastModifiedTime = lastModifiedTime;
      this.identityVerificationQuestion = identityVerificationQuestion;
      this.identityVerificationAnswer = identityVerificationAnswer;
  }

  toDomain() {
      return new UserDomain(
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

}
