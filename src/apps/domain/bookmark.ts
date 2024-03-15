import { v4 } from 'uuid/index';
import { Quotation } from './quotation';

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
