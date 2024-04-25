import {
    UserDomain,
} from "../../../domain/user.domain";

export interface GetUserPort {
  getUserById(id: string): Promise<UserDomain | null>;
  getUserByNickname(id: string): Promise<UserDomain | null>;
}