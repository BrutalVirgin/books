import { ReadingList } from "./reading-list"

export class ReadingListStorage {
    constructor() { }

    private _readingListStorage: ReadingList[] = [
        { id: 1, booksIds: [1, 3, 6,], updatedAt: new Date() },
        { id: 2, booksIds: [4], updatedAt: new Date() },
        { id: 3, booksIds: [2, 5], updatedAt: new Date() },
    ]


    /**
     * Находит юзера по айди
     * @param id 
     * @returns 
     */
    findById(id: number): ReadingList {
        const user = this._readingListStorage.find((user) => {
            return user.id === id
        })
        if (!user) {
            throw new Error("user not found")
        }
        return user
    }

    /**
     * Создает нового юзера с книжкой и добавляет в стораж
     * @param userId 
     * @param booksIds 
     * @returns 
     */
    createNewRl(userId: number, booksIds: number): ReadingList {
        const brandNewRL = {
            id: userId,
            booksIds: [booksIds],
            updatedAt: new Date()
        }
        this._readingListStorage.push(brandNewRL)
        return brandNewRL
    }

    /**
     * Добавляет книгу в стораж
     * @param rl 
     */
    insert(rl: ReadingList) {

        const existingRl = this._readingListStorage.find(_rl => _rl.id === rl.id)

        if (existingRl) {
            const position = this._readingListStorage.indexOf(existingRl)
            this._readingListStorage.splice(position, 1, rl)
        } else {
            this._readingListStorage = [...this._readingListStorage, rl]
        }

    }

    /**
     * Возвращает весь список стораж
     * @returns 
     */
    findAll() {
        return this._readingListStorage
    }

}

