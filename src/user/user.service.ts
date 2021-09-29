import { UserRepository } from "./user-repository";
import { User } from "./user"
import { ReadingList } from "../readinglist/interfaces";

type UserChangeSet = Pick<User, "name" | "age" | "email">
type NewUserSet = Pick<User, "name" | "age" | "email" | "id">

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    findOneById(id: number) {
        const user = this.userRepository.findById(id)

        return user
    }

    findAll() {
        return this.userRepository.findAll()
    }

    createUser(user: NewUserSet) {
        const newUSer = {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.userRepository.insert(newUSer)
    }

    updateUser(id: number, data: UserChangeSet) {

        const user = this.userRepository.findById(id)
        if (!user) {
            throw new Error("user not found")
        }

        const updatedUser: User = { ...user, ...data }
        this.userRepository.insert(updatedUser)
        return updatedUser
    }

    getReadingList(id: number): ReadingList[] {
        id
        throw new Error("not implemented")
    }

}