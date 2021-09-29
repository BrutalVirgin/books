import { User } from "./user"

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

    findAll() {
        return this._users
    }

    delete(id: number) {
        const position = this._users.findIndex(x => x.id === id)
        if (position !== -1) {
            this._users.splice(position, 1)
            if (this._users.length === 0) {
                throw new Error("repo is empty")
            }
        }
        else {
            throw new Error("user not found")
        }

    }

    /**
     * Находит юзера по айди
     * @param id  
     */
    findById(id: number): User | null {
        const user = this._users.find((user) => {
            return user.id === id
        })

        return user ?? null
    }

    /**
     * Всунуть в стораж обновленного юзера
     * @param user 
     * @returns 
     */
    insert(user: User) {
        this.delete(user.id)

        const insertUSer = this._users.push(user)

        return insertUSer
    }
}