import { ReadingList } from "./reading-list-storage"

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

    currentRLIndex(user: number) {
        const currentRLIndex = this._readingListStorage.findIndex(rl => rl.id === user)
        return currentRLIndex
    }


}

