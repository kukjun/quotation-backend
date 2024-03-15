import { v4 } from 'uuid';

/**
 * @property id 식별자
 * @property authorId 명언의 저자 식별자
 * @property content 명언의 내용
 * @property likeCount 명언의 좋아요 수
 * @property shareCount 명언의 공유 수
 * @property commentCount 명언의 댓글 수
 * @property backgroundImagePath 명언의 배경 이미지 경로
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 */
export class Quotation {
  constructor(
    private id: string = v4(),
    private authorId: string,
    private content: string,
    private likeCount: bigint,
    private shareCount: bigint,
    private commentCount: bigint,
    private backgroundImagePath: string,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
  ) {}
}
