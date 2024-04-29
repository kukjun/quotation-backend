import {
    UserRepository, 
} from "../repository/user.repository";
import {
    UserDomain,
} from "../../../../domain/user.domain";
import {
    CreateUserPort, 
} from "../../../../application/port/out/./create-user.port";
import {
    Injectable, 
} from "@nestjs/common";
import {
    GetUserPort, 
} from "../../../../application/port/out/get-user.port";
import {
    UpdateUserPort, 
} from "../../../../application/port/out/update-user.port";

@Injectable()
export class UserAdaptor implements CreateUserPort, GetUserPort, UpdateUserPort {
    constructor(private userRepository: UserRepository) {}

    async getUserById(id: string): Promise<UserDomain | null> {
        const userEntity = await this.userRepository.findById(id);

        return userEntity?.toDomain();
    }

    async getUserByNickname(nickname: string): Promise<UserDomain | null> {
        const userEntity = await this.userRepository.findByNickname(nickname);

        return userEntity?.toDomain();
    }

    async createUser(user: UserDomain): Promise<string | null> {
        const userEntity = user.toEntity();

        return await this.userRepository.createUser(userEntity);
    }

    async updateUser(user: UserDomain): Promise<string> {
        const userEntity = user.toEntity();

        return await this.userRepository.updateUser(userEntity);
    }

}
