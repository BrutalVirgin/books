import express from "express"

import router from "./router"
import { UserRepository } from "./user/user-repository"
import { ReadingListStorage } from "./readinglist/reading-list-repository"
import { BooksRepository } from "./book/book-repository"

async function main() {
    const app = express()


    app.use(express.json())

    const userRepo = new UserRepository()
    const readingListRepo = new ReadingListStorage()
    const booksRepo = new BooksRepository()


    // выдает всех юзееров
    router.get("/users", (_req, res) => {
        const getUsers = userRepo.showUsers()

        res.contentType("json")
        res.end(JSON.stringify(getUsers))
    })

    //  Возвращает читательный лист юзера
    router.get("/user/:id/readinglist", (req, res) => {
        const findUser = readingListRepo.findUserById(Number(req.params.id))

        const repos = booksRepo.findAllBooks(findUser.booksIds)

        res.contentType("json")
        res.end(JSON.stringify(repos))
    })

    // выводит одного юзера
    router.get("/users/:id", (req, res) => {
        const user = userRepo.findUserById(Number(req.params.id))

        res.contentType("json")
        res.end(JSON.stringify(user))
    })

    // обновляет юзера
    router.put("/users/:id", (req, res) => {
        const updatedUser = userRepo.updateById(Number(req.params.id), {
            email: req.body.email, age: Number(req.body.age), name: req.body.name
        })

        res.contentType("json")
        res.end(JSON.stringify(updatedUser))
    })

    app.use(router)

    app.listen(3000, () => console.log("runnin"))
}

main()