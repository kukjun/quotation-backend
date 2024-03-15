import { v4 } from 'uuid';

export class Like {
  constructor(
    private id: string = v4(),
    private userId: string,
    private quotationId: string,
    private createdTime: Date,
    private lastModifiedTime: Date = null,
  ) {}
}
