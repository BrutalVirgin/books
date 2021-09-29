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
    update(id: number, booksId: number) {
        const rl = this.readingListRepository.findById(id)

        const updatedRL: ReadingList = {
            ...rl,
            booksIds: [...rl.booksIds, booksId],
            updatedAt: new Date()
        }

        this.readingListRepository.insert(updatedRL)

        return updatedRL
    }

    create(rl: number) {
        const newRl = {
            id: genId(),
            userId: genId(),
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