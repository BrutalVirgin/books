import { Book } from "./book";
import { BookService } from "./book.service";



export class BooksRepository {
    constructor() { }

    const bookService = new BookService()

    private _books: Book[] = [
        { id: 4, name: "PIZDA", author: "Vara", createdAt: new Date() },
        { id: 2, name: "MOCHA", author: "Vitya", createdAt: new Date() },
        { id: 3, name: "SISKI", author: "Kirill", createdAt: new Date() },
        { id: 1, name: "GOVNO", author: "Artem", createdAt: new Date() },
        { id: 5, name: "PIZDA 2", author: "Vara", createdAt: new Date() },
        { id: 7, name: "MOCHA 2", author: "Vitya", createdAt: new Date() },
        { id: 6, name: "SISKI 2", author: "Kirill", createdAt: new Date() },
    ]

    insert(book: Book) {
        
        BookService.
    }

    /**
     * Находит книгу по айди
     * @param id 
     * @returns 
     */
    findBookById(id: number): Book {
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
     * Находит книгу для добавления
     * @param bookId 
     * @returns 
     */
    findBook(bookId: number) {
        const addingBook = this._books.find(b => b.id === bookId)
        return addingBook
    }

    /**
     * Добавляет новую книгу в стораж
     * @param name 
     * @param author 
     * @returns 
     */
    addBook(name: string, author: string) {
        const book = {
            id: this._books.length + 1,
            name,
            author,
            createdAt: new Date()
        }
        return this._books.push(book)
    }
    /**
     * Достает все книги
     * @returns 
     */
    findAllBooks() {
        return this._books
    }

}