/**
 * Представляет структуру хранеения книг
 */
export interface ReadingList {
    id: number
    userId: number
    booksIds: number[]
    updatedAt: Date
}