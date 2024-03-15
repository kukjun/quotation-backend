import { v4 } from 'uuid/index';
import { Quotation } from './quotation';

/**
 * @property id 식별자
 * @property name 북마크 이름
 * @property userId 북마크를 생성한 사용자의 식별자
 * @property quotations 북마크에 포함된 명언 목록
 * @property visibility 북마크를 외부 노출
 * @property icon 북마크 icon
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 */
export class Bookmark {
  constructor(
    private id: string = v4(),
    private name: string,
    private userId: string,
    private quotations: Quotation[] = [],
    private visibility: boolean,
    private icon: string = null,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
  ) {}
}
