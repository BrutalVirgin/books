import { Book } from "./book";

export class BooksRepository {
    constructor() { }

    private _books: Book[] = [
        { id: 4, name: "PIZDA", author: "Vara", createdAt: new Date() },
        { id: 2, name: "MOCHA", author: "Vitya", createdAt: new Date() },
        { id: 2, name: "MOCHA", author: "Vitya", createdAt: new Date() },
        { id: 3, name: "SISKI", author: "Kirill", createdAt: new Date() },
        { id: 1, name: "GOVNO", author: "Artem", createdAt: new Date() },
        { id: 5, name: "PIZDA 2", author: "Vara", createdAt: new Date() },
        { id: 7, name: "MOCHA 2", author: "Vitya", createdAt: new Date() },
        { id: 6, name: "SISKI 2", author: "Kirill", createdAt: new Date() },
    ]

    findBookById(id: number): Book {
        const book = this._books.find((book) => {
            return book.id === id
        })
        if (!book) {
            throw new Error("book not found")
        }
        return book
    }

    findMany(booksIds: number[]) {
        return this._books.filter(b => booksIds.includes(b.id))
    }

    bookToAdd(bookId: number) {
        const addingBook = this._books.find(b => b.id === bookId)
        return addingBook
    }
}