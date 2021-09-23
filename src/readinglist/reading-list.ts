/**
 * Представляет структуру хранеения книг
 */
export interface ReadingList {
    id: number
    booksIds: number[]
    updatedAt: Date
}