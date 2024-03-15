import { v4 } from 'uuid';

/**
 * @property id 식별자
 * @property commenterId 댓글을 작성한 사용자의 식별자
 * @property commentedUserId 댓글에 태그된 사용자의 식별자
 * @property commentId 댓글 식별자
 * @property alarmCheck 알람 확인
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 */
export class Notification {
  constructor(
    private id: string = v4(),
    private commenterId: string,
    private commentedUserId: string,
    private commentId: string,
    private alarmCheck: boolean,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
  ) {}
}
