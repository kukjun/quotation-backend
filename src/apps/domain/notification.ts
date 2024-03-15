import { v4 } from 'uuid';

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
