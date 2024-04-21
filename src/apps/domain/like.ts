import {
    v4, 
} from "uuid";

/**
 * @property id 식별자
 * @property userId 좋아요를 누른 사용자의 식별자
 * @property quotationId 좋아요를 누른 명언의 식별자
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 */
export class Like {
    constructor(
    private id: string = v4(),
    private userId: string,
    private quotationId: string,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
    ) {}
}
