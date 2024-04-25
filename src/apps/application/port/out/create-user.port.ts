import {
    UserDomain,
} from "../../../domain/user.domain";

export interface CreateUserPort {
  /**
   * user를 생성하고, 생성된 user의 id를 반환하는 Method
   * @param user
   */
  createUser(user: UserDomain): Promise<string>;
}
