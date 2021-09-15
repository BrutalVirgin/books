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


    findAllBooks(booksIds: number[]): void {
        const userBooksStorage = []
        for (var bookId of booksIds) {
            for (var book of this._books) {
                if (book.id === bookId) {
                    const addBook: Book = {
                        ...book,
                    }
                    userBooksStorage.push(addBook)
                }
            }
        }
    }

}