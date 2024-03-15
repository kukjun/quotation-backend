/**
 * @property id 식별자
 * @property password 비밀번호
 * @property nickname 닉네임
 * @property profilePath 프로필 경로
 * @property favoriteAuthor 가장 좋아하는 저자
 * @property favoriteQuotation 가장 좋아하는 명언
 * @property likeQuotationCount 좋아요를 누른 명언의 수
 * @property bookmarkCount 북마크 수
 * @property commentAlarm 댓글 알람
 * @property quotationAlarm 명언 알람
 * @property quotationAlarmTimes 명언 알람 시간들
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 * @property identityVerificationQuestion 본인 확인 질문
 * @property identityVerificationAnswer 본인 확인 답변
 */

export class User {
  constructor(
    private id: string,
    private password: string = '',
    private nickname: string,
    private profilePath: string = null,
    private favoriteQuotation: string = null,
    private favoriteAuthor: string = null,
    private commentAlarm: boolean = false,
    private quotationAlarm: boolean = false,
    private quotationAlarmTimes: Date[] = [],
    private createdTime: Date = new Date(),
    private lastModifiedTime: Date = null,
    private identityVerificationQuestion: string,
    private identityVerificationAnswer: string,
  ) {}
}
