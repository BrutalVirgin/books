import { Book } from "./interfaces";
import { BooksRepository } from "./book-repository";
import { genId } from "../utils";

type BookUpdateChangeSet = Pick<Book, "name" | "author">
type CreateBookDto = Pick<Book, "name" | "author">


export class BookService {
    constructor(
        private readonly booksRepository: BooksRepository,
    ) { }

    create(data: CreateBookDto): Book {
        const book = {
            id: genId(),
            name: data.name,
            author: data.author,
            createdAt: new Date()
        }

        this.booksRepository.insert(book)

        return book
    }



    update(bookId: number, fields: Partial<BookUpdateChangeSet>): Book {
        const book = this.booksRepository.findById(bookId)
        if (!book) {
            throw new Error("book not found")
        }

        const updated = { ...book, ...fields }

        this.booksRepository.delete(book.id)
        this.booksRepository.insert(updated)

        return updated
    }

}