const { create } = require("domain")
const express = require("express")
const { get } = require("https")

const app = express()

const router = express.Router()

app.use(express.json())



const booksStorage = [
    { id: 4, name: "PIZDA", author: "Vara" },
    { id: 2, name: "MOCHA", author: "Vitya" },
    { id: 2, name: "MOCHA", author: "Vitya" },
    { id: 3, name: "SISKI", author: "Kirill" },
    { id: 1, name: "GOVNO", author: "Artem" },
    { id: 5, name: "PIZDA 2", author: "Vara" },
    { id: 7, name: "MOCHA 2", author: "Vitya" },
    { id: 6, name: "SISKI 2", author: "Kirill" },
]
const authors = [
    { id: 1, name: "Vara" },
    { id: 2, name: "Vitya" },
    { id: 3, name: "Kirill" },
    { id: 4, name: "Artem" },
]

const ReadingListStorage = [
    { id: 1, userId: 1, booksIds: [1, 3, 6] },
    { id: 2, userId: 2, booksIds: [4] },
]

const users = [
    { id: 1, userId: 1, name: "Vara" },
    { id: 2, userId: 2, name: "Vitya" },
    { id: 3, userId: 3, name: "Kirill" },
]

// Не доделал еще
// создавать чительный лист
router.post("/readinglist/:userId/:booksIds", (req, res) => {
    const userId = Number(req.params.userId)
    const findUser = users.find((user) => {
        return user.userId === userId
    })
    if (!findUser) {
        return res.end(`user ${userId} not found`)
    }
    for (user of ReadingListStorage) {
        if (user.userId === userId) {
            return res.end(`user ${userId} already have a reading list`)
        }
        else if (user.userId !== userId) {
            const newList = { id: ReadingListStorage.length + 1, userId: req.params.userId, booksIds: [req.params.booksIds] }
            ReadingListStorage.push(newList)
        }
    }

    res.contentType("json")
    res.end(JSON.stringify(ReadingListStorage))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// создаем юзера 
router.post("/users/user/:userId/:name", (req, res) => {
    const userId = Number(req.params.userId)
    for (user of users) {
        if (user.userId === userId)
            return res.end(`user id ${userId} is already taken`)
    }
    const newUser = { id: users.length + 1, userId: req.params.userId, name: req.params.name }
    users.push(newUser)

    res.contentType("json")
    res.end(JSON.stringify(users))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// удаляем юзера
router.delete("/users/user/:id", (req, res) => {
    const getUser = users.find((user) => {
        return user.id === Number(req.params.id)
    })
    if (!getUser) {
        return res.end(`user ${req.params.id} not found`)
    }
    const position = users.indexOf(getUser)
    users.splice(position, 1)

    res.contentType("json")
    res.end(JSON.stringify(users))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// обновляет юзера
router.put("/users/user/:id/:userId/:name", (req, res) => {
    const getUser = users.find((user) => {
        return user.id === Number(req.params.id)
    })
    if (!getUser) {
        return res.end(`user ${req.params.id} not found`)
    }

    const position = users.indexOf(getUser)
    users[position] = { id: getUser.id, userId: req.params.userId, name: req.params.name }

    res.contentType("json")
    res.end(JSON.stringify(users[position]))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// выводит одного юзера
router.get("/users/user/:userId", (req, res) => {
    const getUser = users.find((user) => {
        return user.id === Number(req.params.userId)
    })
    if (!getUser) {
        return res.end(`user ${req.params.userId} not found`)
    }
    res.contentType("json")
    res.end(JSON.stringify(getUser))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// обновлять книгу
router.put("/books/:id/:name/:author", (req, res) => {
    const findBook = booksStorage.find((book) => {
        return book.id === Number(req.params.id)
    })
    if (!findBook) {
        res.end("Книга не найдена")
        return
    }
    const place = booksStorage.indexOf(findBook)
    booksStorage[place] = { id: findBook.id, name: req.params.name, author: req.params.author }

    res.contentType("json")
    res.end(JSON.stringify(booksStorage[place]))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// выдает всех авторов
router.get("/authors", (req, res) => {

    res.contentType("json")
    res.end(JSON.stringify(authors))
})

// ЧЕКНИ ТУТ --------------------------------------------------
// выдает всех юзееров
router.get("/users", (req, res) => {

    res.contentType("json")
    res.end(JSON.stringify(users))
})

//  Возвращает читательный лист юзера
router.get("/user/:userId/readinglist", (req, res) => {
    const userBooksStorage = []
    const findUser = ReadingListStorage.find((user) => {
        return user.id === Number(req.params.userId)
    })
    for (var i = 0; i <= findUser.booksIds.length; i++) {
        for (book of booksStorage) {
            if (book.id === findUser.booksIds[i]) {
                userBooksStorage.push(book)
            }
        }
    }
    res.contentType("json")
    res.end(JSON.stringify(userBooksStorage))
})


// Добавляет юзеру книжку
router.post("/user/:userId/readinglist/:bookId", (req, res) => {
    const bookId = Number(req.params.bookId)
    const userId = Number(req.params.userId)

    const user = users.find((user) => {
        return user.id === userId
    })
    if (!user) {
        res.end(`user ${userId} not found`)
        return
    }
    const bookToAdd = booksStorage.find(b => b.id === bookId)
    if (!bookToAdd) {
        res.end(`book ${bookId} not found`)
        return
    }

    const readingList = ReadingListStorage.find(rl => rl.userId === user.userId)
    if (!readingList) {
        const brandNewRL = {
            userId,
            id: ReadingListStorage.length + 1,
            booksIds: [bookId]
        }
        res.end(JSON.stringify(brandNewRL))
        return
    }

    if (readingList.booksIds.includes(bookId)) {
        res.end(`user already has book ${bookId}`)
        return
    }

    const updatedRL = {
        id: readingList.id,
        userId: user.userId,
        booksIds: [...readingList.booksIds, bookId]
    }

    const currentRLIndex = ReadingListStorage.findIndex(rl => rl.id === readingList.id)

    ReadingListStorage.splice(currentRLIndex, 1)
    ReadingListStorage.push(updatedRL)

    // for (readingList of ReadingListStorage) {
    //     if (readingList.userId === user.userId) {
    //         for (var i = 0; i <= readingList.booksIds.length; i++) {
    //             const rlBookId = readingList.booksIds[i]

    //             if (rlBookId === bookId) {
    //                 console.log("Книга уже есть")
    //                 break
    //             }
    //             else if (bookId !== rlBookId) {
    //                 let newId = ReadingListStorage.length + 1
    //                 const takeABook = { id: newId, userId: user.id, booksIds: [requiredBook.id] }
    //                 ReadingListStorage.push(takeABook)
    //             }
    //         }
    //     }
    // }

    res.contentType("json")
    res.end(JSON.stringify(updatedRL))
})

// Выдает список всех книг в booksStorage
router.get("/books", (req, res) => {
    console.log("GET")

    // impl
    res.contentType("json")
    res.end(JSON.stringify(booksStorage))
})

// выдает инфу по книге (весь объект)
router.get("/books/:id", (req, res) => {
    console.log("GET BOOK", req.params.id)

    const book = booksStorage.find((book) => {
        return book.id === Number(req.params.id)
    })
    if (!book) {
        res.end("nahiu")
        return
    }

    res.contentType("json")
    res.end(JSON.stringify(book))
})
// выдает все книги автора
router.get("/authors/:id/books", (req, res) => {
    const authorBooks = []

    const author = authors.find((author) => {
        return author.id === Number(req.params.id)
    })

    for (book of booksStorage) {
        if (author.name === book.author) {
            authorBooks.push(book)
        }
    }

    res.contentType("json")
    res.end(JSON.stringify(authorBooks))
})


// CRUD
// books
// GET books / id -> read
// books -> create
// Put books / id fields -> update
// Delete books / id -> delete

//     author /: id / books

// POST author /: id / books



// создает книгу по полям  { name: "Vitya", author: "2" } и добавляет в booksStorage 
router.post("/books/", (req, res) => {
    console.log("POST /books", req.body)

    let newId = booksStorage.length + 1
    const newBook = { id: newId, name: req.params.name, author: req.params.author }
    booksStorage.push(newBook)

    res.contentType("json")
    res.end(JSON.stringify(booksStorage))
})

// удаляет книгу по айди
router.delete("/books/:id", (req, res) => {

    const place = booksStorage.find((place) => {
        return place.id === Number(req.params.id)
    })
    if (!place) {
        res.end("nahui")
        return
    }
    booksStorage.splice(booksStorage.indexOf(place), 1)

    res.contentType("json")
    res.end(JSON.stringify(booksStorage))
})


app.use(router)

app.listen(3000, () => {
    console.log("process.pid", process.pid)
    console.log("RUNNIN")
})

// Книга

// создает книгу по полям  { name: "Vitya", author: "2" } и добавляет в booksStorage  +++
// удаляет книгу по айди +++
// выдает список всех книг в booksStorage +++
// обновлять книгу +++
// выдает инфу по книге (весь объект) +++
// удаляет книгу по айди +++

// юзер

// вовращает читательный лист юзера +++
// добавляет юзеру книжку +++
// выводит всех юзеров +++
// выводит одного юзера +++
// обновляет юзера +++
// удаляем юзера +++
// создаем юзера +++

// читательный лист

// создавать чительный лист
// удалять читательный лист
// обновляем читательный лист
// получать читательный лист 

//автор

// создать автора
// удалить автора
// обновить автора
// получить автора
// получить всех авторов +++
// выдает все книги автора +++