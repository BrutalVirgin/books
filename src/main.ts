import express from "express"

import router from "./router"
import { UserRepository } from "./user/user-repository"
import { ReadingListRepository } from "./readinglist/reading-list-repository"
// import { BooksRepository } from "./book/book-repository"
import { UserService } from "./user/user.service"
import { ReadingListService } from "./readinglist/reading.list.service"
import { genId } from "./utils"
import { ReadingList } from "./readinglist/interfaces"
import { BooksRepository } from "./book/book-repository"


async function main() {
    const app = express()

    app.use(express.json())

    const userRepo = new UserRepository()
    const readingListRepo = new ReadingListRepository()
    const userService = new UserService(userRepo, readingListRepo)
    const readingListService = new ReadingListService(readingListRepo)
    const booksRepos = new BooksRepository()


    // выдает всех юзееров
    router.get("/users", (_req, res) => {
        const getUsers = userService.findAll()

        res.contentType("json")
        res.end(JSON.stringify(getUsers))
    })

    //  Возвращает читательный лист юзера
    router.get("/users/:id/readinglist", (req, res) => {
        const rl = readingListRepo.findByUserId(Number(req.params.id))

        res.contentType("json")
        res.end(JSON.stringify(rl))
    })

    // Добавляет юзеру книжку
    // { books: [bookId] }
    // artem: :bookId должен передаваться в теле запроса
    router.post("/users/:id/readinglist", (req, res) => {
        const userId = Number(req.params.id)
        const bookIds = Array(req.body["books"]).map(Number)

        const user = userRepo.findById(userId)
        if (!user) {
            res.end(`user ${userId} not found`)
            return
        }

        const rl: ReadingList = {
            userId,
            id: genId(),
            booksIds: bookIds,
            updatedAt: new Date(),
        }

        readingListRepo.insert(rl)

        res.contentType("json")
        res.end(JSON.stringify(rl))
    })

    // выводит одного юзера
    router.get("/users/:id", (req, res) => {
        const user = userRepo.findById(Number(req.params.id))

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
    //artem: coздаем юзера получая json с полями 
    router.post("/users", (req, res) => {
        const userId = Number(req.body.userId)

        const user = userRepo.findById(userId)
        if (user) {
            return res.end(`user id ${userId} is already taken`)
        }

        const newUser = userService.createUser({ id: genId(), name: req.body.name, email: req.body.email, age: Number(req.body.age) })

        res.contentType("json")
        res.end(JSON.stringify(newUser))
    })

    //___________________________________________________________________

    // создавать чительный лист
    //artem: coздаем readinglist получая json с полями 
    router.post("/readinglist/:id", (req, res) => {
        const userId = Number(req.params.id)
        const user = userRepo.findById(userId)
        if (!user) {
            return res.end(`user ${userId} not found`)
        }
        const userInRL = readingListRepo.findById(userId)

        if (userInRL) {
            return res.end(`user ${userId} already have a reading list`)
        }

        if (!userInRL) {
            const newList = Number(req.body.booksIds)
            readingListService.create(userId, newList)
        }

        const showAll = readingListRepo.findAll()

        res.contentType("json")
        res.end(JSON.stringify(showAll))
    })

    // удалять читательный лист
    router.delete("/readinglist/:id", (req, res) => {
        const userId = Number(req.params.id)
        const user = userRepo.findById(userId)

        if (!user) {
            return res.end(`user ${userId} not found`)
        }
        const findReadList = readingListRepo.findById(userId)

        if (!findReadList) {
            return res.end(`user ${req.params.id} havent reading list`)
        }

        readingListRepo.delete(user.id)

        res.contentType("json")
        res.end(JSON.stringify(readingListRepo.findAll()))
    })

    // обновляем читательный лист
    router.put("/readinglist/:id", (req, res) => {
        const user = readingListRepo.findById(Number(req.params.id))
        if (!user) {
            return res.end(`user ${req.params.id} not found`)
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


    app.use(router)

    app.listen(3000, () => console.log("runnin"))

}



main()

// function test() {
//     const readingListRepo = new ReadingListStorage()

//     const updated = readingListRepo.updateRL(2, 1)

//     if (updated.booksIds.includes(1)) {
//         console.log("maladec")
//     } else {
//         console.log("gabella")
//     }

// }

// test()


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
// https://BrutalVirgin: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@github.com/BrutalVirgin/books.git