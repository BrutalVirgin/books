import { User } from "./user"

/**
 * Содержит логику хранения и извлечения юзера
 */
export class UserRepository {
    constructor() { }

    private _users: User[] = [
        { id: 1, name: "Vara", email: "govno1@a.com", age: 22, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 1, name: "Vitya", email: "govno2@a.com", age: 27, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 1, name: "Kirill", email: "govno3@a.com", age: 25, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },
        { id: 1, name: "Artem", email: "govno4@a.com", age: 26, createdAt: new Date(2021, 8, 9), updatedAt: new Date(2021, 8, 9) },

    ]

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
     * Обновляем поля юзера по айди и возвращаес обновленного юзера
     * @param id 
     * @param fields 
     */
    updateById(id: string, fields: Partial<User>): User {
        id
        fields
        throw new Error("not implemented")
    }
}