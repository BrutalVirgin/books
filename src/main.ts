import express from "express"

// import fs /*{ writeFileSync } */ from 'fs';

import router from "./router"
import { UserRepository } from "./user/user-repository"
import { UserService } from "./user/user.service"
import { ReadingListRepository } from "./readinglist/reading-list-repository"
import { ReadingListService } from "./readinglist/reading.list.service"
//import { ReadingList } from "./readinglist/interfaces"
import { genId } from "./utils"
import { BooksRepository } from "./book/book-repository"
import { BookService } from "./book/book.service"
import { AuthorRepository } from "./author/author-repository"
import { AuthorService } from "./author/author.service"




async function main() {
    const app = express()

    app.use(express.json())

    const userRepo = new UserRepository()
    const readingListRepo = new ReadingListRepository()
    const userService = new UserService(userRepo, readingListRepo)
    const readingListService = new ReadingListService(readingListRepo)
    const booksRepos = new BooksRepository()
    const bookService = new BookService(booksRepos)
    const authorRepos = new AuthorRepository()
    const authorService = new AuthorService(authorRepos)

    // const str = JSON.stringify({ uno: 1, dos: 2, date: "asd" })
    // fs.writeFile("test.txt", str, (err) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log("запись завершена")
    // })

    // fs.readFile("test.txt", "utf-8", (err, data) => {
    //     console.log(data)

    //     if (err) {
    //         throw err
    //     }
    // })
    // fs.appendFile("test.txt", `\n${str}`, (err) => {
    //     if (err) {
    //         throw err
    //     }

    //     fs.readFile("test.txt", "utf-8", (err, data) => {
    //         console.log(data)

    //         if (err) {
    //             throw err
    //         }
    //     })
    // })


    // выдает всех юзееров +++
    router.get("/users", (_req, res) => {
        const getUsers = userService.findAll()

        res.contentType("json")
        res.end(JSON.stringify(getUsers))
    })

    //  Возвращает читательный лист юзера +++
    router.get("/users/:userid/readinglists", (req, res) => {
        const rl = readingListRepo.findByUserId(Number(req.params.userid))
        if (!rl) {
            throw new Error("reading list not found")
        }


        res.contentType("json")
        res.end(JSON.stringify(rl))
    })

    // Добавляет юзеру книжку
    router.post("/users/:id/readinglist", (req, res) => {
        const userId = Number(req.params.id)
        const bookIds = req.body["booksIds"].map(Number)
        console.log(bookIds)

        const user = userRepo.findById(userId)
        if (!user) {
            return res.end(`user ${userId} not found`)
        }

        const rl = readingListService.create(userId, bookIds)

        res.contentType("json")
        res.end(JSON.stringify(rl))
    })

    // выводит одного юзера
    router.get("/users/:id", (req, res) => {
        const user = userRepo.findById(Number(req.params.id))
        if (!user) {
            return res.end("user not found")
        }

        res.contentType("json")
        res.end(JSON.stringify(user))
    })

    // обновляет юзера
    router.put("/users/:id", (req, res) => {
        const userId = Number(req.params.id)

        const update = userService.updateUser(userId, { name: req.body.name, age: Number(req.body.age), email: req.body.email })

        res.contentType("json")
        res.end(JSON.stringify(update))
    })

    // удаляем юзера
    // artem: /users/:id 
    router.delete("/users/:id", (req, res) => {
        userRepo.delete(Number(req.params.id))

        const users = userRepo.findAll()

        res.contentType("json")
        res.end(JSON.stringify(users))
    })


    // создаем юзера 
    router.post("/users", (req, res) => {
        const newUser = userService.createUser({ id: genId(), name: req.body.name, email: req.body.email, age: Number(req.body.age) })

        res.contentType("json")
        res.end(JSON.stringify(newUser))
    })

    //___________________________________________________________________

    // создавать чительный лист
    router.post("/readinglist/:id", (req, res) => {
        const userId = Number(req.params.id)
        const user = userRepo.findById(userId)
        if (!user) {
            return res.end(`user ${userId} not found`)
        }

        const newList = req.body["books"].map(Number)
        readingListService.create(userId, newList)

        res.contentType("json")
        res.end(JSON.stringify(readingListRepo.findAll()))
    })

    // удалять читательный лист
    router.delete("/readinglist/:userid", (req, res) => {
        const userId = Number(req.params.userid)
        const user = userRepo.findById(userId)

        if (!user) {
            return res.end(`user ${userId} not found`)
        }
        const findReadList = readingListRepo.findById(userId)

        if (!findReadList) {
            return res.end(`user ${req.params.userid} havent reading list`)
        }

        readingListRepo.delete(user.id)

        res.contentType("json")
        res.end(JSON.stringify(readingListRepo.findAll()))
    })

    // обновляем читательный лист
    router.put("/readinglist/:userid", (req, res) => {
        const user = readingListRepo.findById(Number(req.params.userid))
        if (!user) {
            return res.end(`user ${req.params.userid} not found`)
        }

        const book = booksRepos.findById(Number(req.body.booksId))
        if (!book) {
            return res.end(`book ${Number(req.body.booksId)} not found`)
        }

        if (user.booksIds.length >= 5) {
            return res.end(`You have more than 5 books. Pashol nahui`)
        }

        if (user && user.booksIds.length < 5) {
            readingListService.update(user.id, Number(req.body.booksId))
        }

        res.contentType("json")
        res.end(JSON.stringify(readingListRepo.findById(user.id)))
    })

    // получать читательный лист 
    router.get("/readinglist", (_req, res) => {

        res.contentType("json")
        res.end(JSON.stringify(readingListRepo.findAll()))
    })


    //___________________________________________________________________

    // создать автора
    router.post("/authors", (req, res) => {
        const newAuthor = req.body.name
        authorService.create(newAuthor)

        res.contentType("json")
        res.end(JSON.stringify(authorRepos.showAll()))
    })

    // удалить автора
    router.delete("/authors/:id", (req, res) => {
        const author = authorRepos.findById(Number(req.params.id))
        if (!author) {
            return res.end(`author ${Number(req.params.id)} not found`)
        }

        authorRepos.delete(author.id)

        res.contentType("json")
        res.end(JSON.stringify(authorRepos.showAll()))
    })

    // обновить автора
    router.put("/authors/:id", (req, res) => {

        const author = authorRepos.findById(Number(req.params.id))
        if (!author) {
            return res.end(`author with id ${Number(req.params.id)} not found`)
        }
        const updatedAuthor = authorService.update(author, req.body.name)

        res.contentType("json")
        res.end(JSON.stringify(updatedAuthor))
    })

    // получить автора
    router.get("/authors/:id", (req, res) => {
        const author = authorRepos.findById(Number(req.params.id))
        if (!author) {
            return res.end(`author with id ${req.params.id} not found`)
        }

        res.contentType("json")
        res.end(JSON.stringify(author))
    })

    // получить всех авторов
    router.get("/authors", (_req, res) => {

        res.contentType("json")
        res.end(JSON.stringify(authorRepos.showAll()))
    })

    // выдает все книги автора
    router.get("/authors/:id/books", (req, res) => {
        const author = authorRepos.findById(Number(req.params.id))
        if (!author) {
            return res.end(`author with id ${req.params.id} not found`)
        }

        const authorBooks = booksRepos.findBooksByAuthor(author.name)

        res.contentType("json")
        res.end(JSON.stringify(authorBooks))
    })

    //______________________________________________________________

    // создает книгу и добавляет в booksStorage 
    router.post("/books/", (req, res) => {

        const newBook = { name: req.body.name, author: req.body.author }
        const addBook = bookService.create(newBook)

        res.contentType("json")
        res.end(JSON.stringify(addBook))
    })

    // удаляет книгу по айди
    router.delete("/books/:id", (req, res) => {

        const book = booksRepos.findById(Number(req.params.id))
        if (!book) {
            res.end("book not found")
            return
        }
        booksRepos.delete(book.id)

        res.contentType("json")
        res.end(JSON.stringify(booksRepos.findAll()))
    })

    // Выдает список всех книг в booksStorage
    router.get("/books", (_req, res) => {

        res.contentType("json")
        res.end(JSON.stringify(booksRepos.findAll()))
    })

    // обновлять книгу
    router.put("/books/:id", (req, res) => {
        const book = booksRepos.findById(Number(req.params.id))
        if (!book) {
            return res.end(`book with id ${Number(req.params.id)} not found`)
        }

        const updatedBook = bookService.update(book.id, { name: req.body.name, author: req.body.author })

        res.contentType("json")
        res.end(JSON.stringify(updatedBook))
    })

    // выдает инфу по книге (весь объект)
    router.get("/books/:id", (req, res) => {
        const book = booksRepos.findById(Number(req.params.id))
        if (!book) {
            return res.end("book not found")

        }

        res.contentType("json")
        res.end(JSON.stringify(book))
    })

    app.use(router)

    app.listen(3000, () => console.log("runnin"))

}



main

function test() {
    const repo = new ReadingListRepository()

    console.log(repo.findAll())

}
test()


// function massivi() {
//     const arr: number[] = [
//         4,
//         1,
//         3,
//         5,
//         2,
//         10,
//     ]

    // сделай масив в котором есть только четные
    // const newArr = arr.filter(a => a % 2 === 0)
    // console.log(newArr)
//     const newArr5 = arr.reduce<number[]>((acc, curVal) => {
//         if (curVal % 2 === 0) {
//             return [...acc, curVal]
//         }
//         return acc
//     }, [])
//     console.log(newArr5)
//     // сделай массив где каждый элемент больше в два раза чем  в arr
//     const newArr2 = arr.map(x => x * 2)
//     console.log(newArr2)
//     // сделай массив где каждый элемент это копия arr
//     // const newArr3 = arr.slice(0, arr.length)
//     // console.log(newArr3)
//     const array = arr.map(_ => arr)
//     console.log(array)
//     // сумма всех элементов
//     const newArr4 = arr.reduce((a, b) => a + b)
//     console.log(newArr4)
//     // отсортируй без sort
//     function bubbleSort(mainArr: (number | undefined)[]) {
//         for (var i = 0; i < mainArr.length; i++) {
//             for (var j = mainArr.length - 1; j > i; j--) {
//                 if (mainArr[j - 1]! > mainArr[j]!) {
//                     [mainArr[j - 1], mainArr[j]] = [mainArr[j], mainArr[j - 1]]
//                 }
//             }
//         }
//         return mainArr
//     }

//     const newArr6 = arr.reduce<number[]>((acc, currVal,) => {
//         if (acc.length === 0) {
//             return [currVal]
//         }
//         else {
//             return [...acc, currVal]
//         }
//         return acc
//     }, [])
//     console.log(bubbleSort(newArr6))
// }

// massivi()
// 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
