import { UserRepository } from "./user-repository";
import { User } from "./user"


export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }


    updateUser(user: User) {
        const updatedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            age: Number(user.age),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const update = this.userRepository.insertCurrentUSer(updatedUser)
        return update
    }


}
///asdsd