import { v4 } from 'uuid';

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
