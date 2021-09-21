import { User } from "./user"

type UpdateUserFields = Partial<Pick<User, "email" | "age" | "name">>

/**
 * Содержит логику хранения и извлечения юзера
 */
export class UserRepository {
    constructor() { }

    private _users: User[] = [
        { id: 1, name: "Vara", email: "govno1@a.com", age: 22, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 2, name: "Vitya", email: "govno2@a.com", age: 27, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 3, name: "Kirill", email: "govno3@a.com", age: 25, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 4, name: "Artem", email: "govno4@a.com", age: 26, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },

    ]


    showUsers() {
        return this._users
    }

    /**
     * Находит дебика по айди
     * @param id  
     */
    findUserById(id: number): User {
        const user = this._users.find((user) => {
            return user.id === id
        })
        if (!user) {
            throw new Error("user not found")
        }
        return user
    }

    /**
     * Обновляет юзера по айди
     * @param id 
     * @param fields 
     */
    updateById(id: number, fields: UpdateUserFields): User {
        const user = this.findUserById(id)
        const position = this._users.indexOf(user)
        const updatedUser: User = {
            ...user,
            ...fields,
            updatedAt: new Date(),
        }

        this._users[position] = updatedUser

        return updatedUser
    }
}