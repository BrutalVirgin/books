import { UserRepository } from "./user-repository";
import { ReadingListRepository } from "../readinglist/reading-list-repository"
import { User } from "./user"


type UserChangeSet = Pick<User, "name" | "age" | "email">
type NewUserSet = Pick<User, "name" | "age" | "email" | "id">

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly readingListRepository: ReadingListRepository
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

    /**
     * Вовзращает читательный лист юзера ///////////////////////////////////////////
     * @param id 
     */
    getReadingList(id: number) {
        const user = this.readingListRepository.findById(id)
        const books = user.booksIds.reduce<number[]>((acc, val) => {
            return [...acc, val]
        }, [])

        return books
    }

}