import { User } from "./user"

/**
 * Содержит логику хранения и извлечения юзера
 */
export class UserRepository {
    constructor() { }

    private _users: User[] = [
        { id: 1, userId: 1, name: "Vara" },
        { id: 2, userId: 2, name: "Vitya" },
        { id: 3, userId: 3, name: "Kirill" },
        { id: 4, userId: 4, name: "sdfsfd" },
    ]

    /**
     * Находит дебика по айди
     * @param id 
     */
    findUserById(id: string): User {
        throw new Error("not implemented")
    }

    /**
     * Обновляем поля юзера по айди и возвращаес обновленного юзера
     * @param id 
     * @param fields 
     */
    updateById(id: string, fields: Partial<User>): User {
        throw new Error("not implemented")
    }
}