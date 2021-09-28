import { ReadingList } from "./reading-list"
import { ReadingListStorage } from "./reading-list-repository"

export class ReadingListService {
    constructor(
        private readonly readingListRepository: ReadingListStorage
    ) { }

    /**
        * Обновляет ридинг лист
        * @param id 
        * @param booksId 
        * @returns 
        */
    updateRL(id: number, booksId: number) {
        const rl = this.readingListRepository.findById(id)

        const updatedRL: ReadingList = {
            ...rl,
            booksIds: [...rl.booksIds, booksId],
            updatedAt: new Date()
        }

        this.readingListRepository.insert(updatedRL)

        return updatedRL
    }

}