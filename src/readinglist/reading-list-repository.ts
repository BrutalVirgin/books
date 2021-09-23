//import { Book } from "../book/book"
import { ReadingList } from "./reading-list"

export class ReadingListStorage {
    constructor() { }

    private _readingListStorage: ReadingList[] = [
        { id: 1, booksIds: [1, 3, 6,], updatedAt: new Date() },
        { id: 2, booksIds: [4], updatedAt: new Date() },
        { id: 3, booksIds: [2, 5], updatedAt: new Date() },
    ]


    /**
     * Находит дебика по айди
     * @param id 
     * @returns 
     */
    findUserById(id: number): ReadingList {
        const user = this._readingListStorage.find((user) => {
            return user.id === id
        })
        if (!user) {
            throw new Error("user not found")
        }
        return user
    }

    /**
     * Создает нового юзера с книжкой
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
        return brandNewRL
    }

    /**
     * Возвращает весь список стораж
     * @returns 
     */
    findAll() {
        return this._readingListStorage
    }

    /**
     * Обновляет ридинг лист
     * @param id 
     * @param booksId 
     * @returns 
     */
    // updateRL(id: number, booksId: number) {
    //     const updatedRL: ReadingList = {
    //         id,
    //         booksIds: [booksId],
    //         updatedAt: new Date()
    //     }
    //     const position = this._readingListStorage.indexOf(this.findUserById(id))
    //     const newRl = this._readingListStorage.splice(position, 1, this.updatedRL)
    //     return newRl
    // }

}

