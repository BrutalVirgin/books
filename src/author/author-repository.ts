import { Author } from "./interface";

export class AuthorRepository {
    constructor() { }


    private _authorRepository: Author[] = [
        { id: 1, name: "Vara", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "Vitya", createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: "Kirill", createdAt: new Date(), updatedAt: new Date() },
        { id: 4, name: "Artem", createdAt: new Date(), updatedAt: new Date() },
    ]


    findById(id: number): Author {
        const author = this._authorRepository.find(author => author.id === id)

        return author!
    }

    delete(id: number): void {
        const position = this._authorRepository.findIndex(x => x.id === id)
        if (position !== -1) {
            this._authorRepository.splice(position, 1)
            if (this._authorRepository.length === 0) {
                throw new Error("repo is empty")
            }
        }
    }

    insert(author: Author): void {
        const newUser = this._authorRepository.find(x => x.id === author.id)
        if (!newUser) {
            this._authorRepository.push(author)
        }
    }

    showAll(): Author[] {
        return this._authorRepository
    }
}