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

main


function massivi() {
    const arr: number[] = [
        4,
        1,
        3,
        5,
        2,
    ]

    // сделай масив в котором есть только четные
    // const newArr = arr.filter(a => a % 2 === 0)
    // console.log(newArr)
    const newArr5 = arr.reduce<number[]>((acc, curVal) => {
        if (curVal % 2 === 0) {
            return [...acc, curVal]
        }
        return acc
    }, [])
    console.log(newArr5)
    // сделай массив где каждый элемент больше в два раза чем  в arr
    const newArr2 = arr.map(x => x * 2)
    console.log(newArr2)
    // сделай массив где каждый элемент это копия arr
    const newArr3 = arr.slice(0, arr.length)
    console.log(newArr3)
    // сумма всех элементов
    const newArr4 = arr.reduce((a, b) => a + b)
    console.log(newArr4)
    // отсортируй без sort
    arr.reduce<number[]>((acc, currVal) => {
        if (acc.length === 0) {
            return [currVal]
        }
        var i = 0
        const prev = acc[i]
        if (prev! > currVal) {
            return [currVal]
        }
        return acc
    }, [])

}
massivi()