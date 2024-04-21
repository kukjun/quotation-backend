import {
    v4, 
} from "uuid";

/**
 * @property id 식별자
 * @property name 저자의 이름
 * @property countryCode 저자의 국적 코드
 * @property createdTime 생성된 시간
 * @property lastModifiedTime 마지막 수정 시간
 */
export class Author {
    constructor(
    private _id: string = v4(),
    private _name: string,
    private _countryCode: string,
    private _createdTime: Date,
    private _lastModifiedTime: Date | null = null,
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get countryCode(): string {
        return this._countryCode;
    }

    get createdTime(): Date {
        return this._createdTime;
    }

    get lastModifiedTime(): Date {
        return this._lastModifiedTime;
    }
}
