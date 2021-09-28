import { UserRepository } from "./user-repository";
import { User } from "./user"

type UserChangeSet = Pick<User, "name" | "age" | "email">

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }


    updateUser(id: number, data: UserChangeSet) {

        const user = this.userRepository.findUserById(id)
        if (!user) {
            throw new Error("user not found")
        }

        const updatedUser: User = { ...user, ...data }
        this.userRepository.insert(updatedUser)
        return updatedUser
    }


}

// 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
// https://BrutalVirgin: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@github.com/BrutalVirgin/books.git