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
