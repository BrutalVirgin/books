import { Book } from "./interfaces";


export class BooksRepository {
    constructor() { }

    private _books: Book[] = [
        { id: 4, name: "PIZDA", author: "Vara", createdAt: new Date() },
        { id: 2, name: "MOCHA", author: "Vitya", createdAt: new Date() },
        { id: 3, name: "SISKI", author: "Kirill", createdAt: new Date() },
        { id: 1, name: "GOVNO", author: "Artem", createdAt: new Date() },
        { id: 5, name: "PIZDA 2", author: "Vara", createdAt: new Date() },
        { id: 7, name: "MOCHA 2", author: "Vitya", createdAt: new Date() },
        { id: 6, name: "SISKI 2", author: "Kirill", createdAt: new Date() },
    ]
    /**
     * Вставляет книгу в стораж
     * @param book 
     * @returns 
     */
    insert(book: Book) {
        return this._books.push(book)
    }

    /**
     * Находит книгу по айди
     * @param id 
     * @returns 
     */
    findById(id: number): Book {
        const book = this._books.find((book) => {
            return book.id === id
        })
        if (!book) {
            throw new Error("book not found")
        }

        return book
    }

    /**
     * Находит книги по условию
     * @param booksIds 
     * @returns 
     */
    findMany(booksIds: number[]) {
        return this._books.filter(b => booksIds.includes(b.id))
    }

    /**
     * Достает все книги
     * @returns 
     */
    findAll() {
        return this._books
    }

}