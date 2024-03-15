import { v4 } from 'uuid';

/**
 * @property id 식별자
 * @property quotationId 댓글을 작성한 명언의 식별자
 * @property userId 댓글을 작성한 사용자의 식별
 * @property content 댓글 내용
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 * @property parentCommentId 댓글의 상위 댓글 식별자
 * @property childCommentIds 댓글의 하위 댓글 목록
 */
export class Comment {
  constructor(
    private id: string = v4(),
    private quotationId: string,
    private userId: string,
    private content: string,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
    private parentCommentId: string,
    private childCommentIds: Comment[] = [],
  ) {}
}
