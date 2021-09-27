import express from "express"

import router from "./router"
import { UserRepository } from "./user/user-repository"
import { ReadingListStorage } from "./readinglist/reading-list-repository"
import { BooksRepository } from "./book/book-repository"
import { UserService } from "./user/user.service"


async function main() {
    const app = express()


    app.use(express.json())

    const userRepo = new UserRepository()
    const readingListRepo = new ReadingListStorage()
    const booksRepo = new BooksRepository()
    const userService = new UserService(userRepo)




    // Добавляет юзеру книжку
    // artem: :bookId должен передаваться в теле запроса
    router.post("/user/:id/readinglist", (req, res) => {


        const bookId = Number(req.body.bookId)
        const userId = Number(req.params.id)

        const user = userRepo.findUserById(userId)
        if (!user) {
            res.end(`user ${userId} not found`)
            return
        }
        const bookToAdd = booksRepo.findBook(bookId)
        if (!bookToAdd) {
            res.end(`book ${bookId} not found`)
            return
        }

        const readingList = readingListRepo.findUserById(userId)
        if (!readingList) {
            const brandNewRL = readingListRepo.createNewRl(userId, bookToAdd.id)
            res.end(JSON.stringify(brandNewRL))
            return
        }

        if (readingList.booksIds.includes(bookId)) {
            res.end(`user already has book ${bookId}`)
            return
        }

        const updatedRL = readingListRepo.updateRL(userId, bookId)

        res.contentType("json")
        res.end(JSON.stringify(updatedRL))
    })


    // выдает всех юзееров
    router.get("/users", (_req, res) => {
        const getUsers = userRepo.showAllUsers()

        res.contentType("json")
        res.end(JSON.stringify(getUsers))
    })

    //  Возвращает читательный лист юзера
    router.get("/user/:id/readinglist", (req, res) => {
        const findUser = readingListRepo.findUserById(Number(req.params.id))

        const repos = booksRepo.findMany(findUser.booksIds)

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
        const userId = Number(req.params.id)

        const update = userService.updateUser(userId, { name: req.body.name, age: Number(req.body.age), email: req.body.email })

        res.contentType("json")
        res.end(JSON.stringify(update))
    })


    app.use(router)

    app.listen(3000, () => console.log("runnin"))
}



main()


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