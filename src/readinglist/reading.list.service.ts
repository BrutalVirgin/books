import { genId } from "../utils"
import { ReadingList } from "./interfaces"
import { ReadingListRepository } from "./reading-list-repository"

export class ReadingListService {
    constructor(
        private readonly readingListRepository: ReadingListRepository
    ) { }

    /**
        * Обновляет ридинг лист
        * @param id 
        * @param booksId 
        * @returns 
        */
    update(userId: number, booksId: number) {
        const rl = this.readingListRepository.findById(userId)

        const book = rl.booksIds.includes(booksId)
        if (book) {
            throw new Error("user alreadu have this book")
        }

        const updatedRL: ReadingList = {
            ...rl,
            booksIds: [...rl.booksIds, booksId],
            updatedAt: new Date()
        }

        this.readingListRepository.insert(updatedRL)

        return updatedRL
    }

    create(userId: number, rl: number) {
        const newRl = {
            id: genId(),
            userId: userId,
            booksIds: [rl],
            updatedAt: new Date()
        }

        this.readingListRepository.insert(newRl)
    }

    /** ///////// SERVISNAYAYAYAYSY JEJEJJEJEJEJ
    * Создает нового юзера с книжкой и добавляет в стораж
    * @param userId 
    * @param booksIds 
    * @returns 
    */
    createNewRl(id: number, booksIds: number, userId: number): ReadingList {
        const brandNewRL = {
            id: id,
            userId: userId,
            booksIds: [booksIds],
            updatedAt: new Date()
        }
        this.readingListRepository.insertNewUSer(brandNewRL)
        return brandNewRL
    }

}