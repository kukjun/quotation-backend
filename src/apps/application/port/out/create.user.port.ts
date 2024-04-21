import {
    User, 
} from "../../../domain/user";

export interface CreateUserPort {
  createUser(user: User): Promise<string>;
}
