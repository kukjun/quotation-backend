import {
    UserRepository, 
} from "../repository/user.repository";
import {
    User, 
} from "../../../../domain/user";
import {
    CreateUserPort, 
} from "../../../../application/port/out/create.user.port";
import {
    Injectable, 
} from "@nestjs/common";

@Injectable()
export class UserAdaptor implements CreateUserPort {
    constructor(private userRepository: UserRepository) {}

    async findUserById(id: string): Promise<User | null> {
        const accountDto = await this.userRepository.findById(id);
        if (!accountDto) {
            return null;
        } else {
            return accountDto.toDomain();
        }
    }

    async createUser(user: User): Promise<string | null> {
        const userEntity = user.toEntity();

        return await this.userRepository.createUser(userEntity);
    }
}
