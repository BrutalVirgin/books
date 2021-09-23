import { Book } from "./book";
import { BooksRepository } from "./book-repository";

type BookUpdateChangeSet = Pick<Book, "name" | "author">
type CreateBookDto = Pick<Book, "name" | "author">


export class BookService {
    constructor(
        private readonly booksRepository: BooksRepository,
    ) { }


    addAuthor(bookdId: string, authroId: string) {

    }

    create(data: CreateBookDto, idLength: number) {
        const book = {
            id: idLength,
            name: data.name,
            author: data.author,
            createdAt: new Date()
        }

        this.booksRepository.insert(book)

        return book
    }



    update(bookId: string, fields: Partial<BookUpdateChangeSet>) {
        const book = this.booksRepository.findBookById(Number(bookId))
        if (!book) {
            throw new Error("user not found")
        }

        const updated = { ...book, ...fields }

        this.booksRepository.insert(updated)

        return updated
    }


}