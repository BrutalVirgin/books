import { UserRepository } from "./user-repository";
import { User } from "./user"

type UserChangeSet = Pick<User, "name" | "age" | "email">

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }


    updateUser(id: number, data: UserChangeSet) {

        const user = this.userRepository.findUserById(id)
        const updatedUser = { ...user, data }
        this.userRepository.insert(updatedUser)
        return updatedUser
    }


}