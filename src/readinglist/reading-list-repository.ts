//import { User } from "../user/user"
import { ReadingList } from "./interfaces"

export class ReadingListRepository {
    constructor() { }

    private _readingListStorage: ReadingList[] = [
        { id: 1, booksIds: [1, 3, 6,], updatedAt: new Date(), userId: 1 },
        { id: 2, booksIds: [4], updatedAt: new Date(), userId: 2 },
        { id: 3, booksIds: [2, 5], updatedAt: new Date(), userId: 3 },
    ]

    /**
     * Находит юзера по айди ???
     * @param id 
     * @returns 
     */
    findById(id: number): ReadingList {
        const user = this._readingListStorage.find((user) => {
            return user.id === id
        })

        return user!
    }

    /**
     * Находит юзера по user.id
     * @param userId 
     * @returns 
     */
    findByUserId(userId: number): ReadingList[] {

        return this._readingListStorage.filter(user => user.id === userId)
    }

    delete(userId: number): void {
        const position = this._readingListStorage.findIndex(x => x.id === userId)
        if (position !== -1) {
            this._readingListStorage.splice(position, 1)
            if (this._readingListStorage.length === 0) {
                throw new Error("repo is empty")
            }
        }
    }

    /**
     * Добавляет книгу в стораж
     * @param rl 
     */
    insert(rl: ReadingList): void {

        const existingRl = this._readingListStorage.find(_rl => _rl.id === rl.id)

        if (existingRl) {
            const position = this._readingListStorage.indexOf(existingRl)
            this._readingListStorage.splice(position, 1, rl)
        } else {
            this._readingListStorage = [...this._readingListStorage, rl]
        }

    }

    insertNewUSer(user: ReadingList): void {
        const newUser = this._readingListStorage.find(x => x.id === user.id)
        if (!newUser) {
            this._readingListStorage.push(user)
        }
    }

    /**
     * Возвращает весь список стораж
     * @returns 
     */
    findAll(): ReadingList[] {
        return this._readingListStorage
    }

}

