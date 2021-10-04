import { genId } from "../utils";
import { AuthorRepository } from "./author-repository";
import { Author } from "./interface";

export class AuthorService {
    constructor(
        private readonly authorRepository: AuthorRepository
    ) { }


    create(name: string): Author {
        const newAuthor = {
            id: genId(),
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        this.authorRepository.insert(newAuthor)
        return newAuthor
    }

    update(author: Author, name: string): Author {
        const updatedAuthor = { ...author, name }
        return updatedAuthor
    }

}

