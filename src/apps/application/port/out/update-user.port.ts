import {
    UserDomain, 
} from "../../../domain/user.domain";

export interface UpdateUserPort {
  /**
   * user가 가지고 있는 정보를 변경하고 id를 반환함.
   * @param user
   */
  updateUser(user: UserDomain): Promise<string>;
}