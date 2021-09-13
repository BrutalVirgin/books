const { create } = require("domain")
const express = require("express")
const { get } = require("https")

const app = express()

const router = express.Router()

app.use(express.json())


// DRY donut repit yourself https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
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
	{ id: 1, userId: 1, booksIds: [1, 3, 6,] },
	{ id: 2, userId: 2, booksIds: [4] },
	{ id: 3, userId: 3, booksIds: [2, 5] },
]

const users = [
	{ id: 1, userId: 1, name: "Vara" },
	{ id: 2, userId: 2, name: "Vitya" },
	{ id: 3, userId: 3, name: "Kirill" },
	{ id: 4, userId: 4, name: "sdfsfd" },
]

// создать автора
router.post("/authors", (req, res) => {
	const newAuthor = { id: authors.length + 1, name: req.body.name }
	authors.push(newAuthor)

	res.contentType("json")
	res.end(JSON.stringify(authors))
})

// удалить автора
router.delete("/authors/:id", (req, res) => {
	const findUser = authors.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!findUser) {
		return res.end(`author ${req.params.id} not found`)
	}
	const position = authors.indexOf(findUser)
	authors.splice(position, 1)

	res.contentType("json")
	res.end(JSON.stringify(authors))
})

// обновить автора
router.put("/authors/:id", (req, res) => {

	const findAuthor = authors.find((author) => {
		return author.id === Number(req.params.id)
	})
	if (!findAuthor) {
		return res.end(`author with id ${req.params.id} not found`)
	}
	const updatedAuthor = { id: findAuthor.id, name: req.body.name }
	authors[authors.indexOf(findAuthor)] = updatedAuthor

	res.contentType("json")
	res.end(JSON.stringify(authors))
})

// получить автора
router.get("/authors/:id", (req, res) => {
	const findAuthor = authors.find((author) => {
		return author.id === Number(req.params.id)
	})
	if (!findAuthor) {
		return res.end(`author with id ${req.params.id} not found`)
	}

	res.contentType("json")
	res.end(JSON.stringify(author))
})

// получить всех авторов
router.get("/authors", (req, res) => {

	res.contentType("json")
	res.end(JSON.stringify(authors))
})

// выдает все книги автора
router.get("/authors/:id/books", (req, res) => {
	const authorBooks = []

	const author = authors.find((author) => {
		return author.id === Number(req.params.id)
	})
	if (!author) {
		return res.end(`author with id ${req.params.id} not found`)
	}

	for (book of booksStorage) {
		if (author.name === book.author) {
			authorBooks.push(book)
		}
	}

	res.contentType("json")
	res.end(JSON.stringify(authorBooks))
})

// _________________________________________________________________________________________________________
// создавать чительный лист
//artem: coздаем readinglist получая json с полями 
router.post("/readinglist/:id", (req, res) => {
	const userId = Number(req.body.userId)
	const findUser = users.find((user) => {
		return user.userId === userId
	})
	if (!findUser) {
		return res.end(`user ${userId} not found`)
	}
	const readUsersIds = ReadingListStorage.map(id => {
		return id.userId
	})

	if (readUsersIds.includes(userId)) {
		return res.end(`user ${userId} already have a reading list`)
	}

	if (!readUsersIds.includes(userId)) {
		const newList = { id: ReadingListStorage.length + 1, userId: Number(req.body.userId), booksIds: req.body.booksIds }
		ReadingListStorage.push(newList)
	}

	res.contentType("json")
	res.end(JSON.stringify(ReadingListStorage))
})

// удалять читательный лист
router.delete("/readinglist/:id", (req, res) => {
	const findUser = users.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!findUser) {
		return res.end(`user ${req.body.userId} not found`)
	}
	const findReadListUser = ReadingListStorage.find((userId) => {
		return userId.id === Number(req.params.id)
	})
	if (!findReadListUser) {
		return res.end(`user ${req.params.id} havent reading list`)
	}
	const getReadListUserId = ReadingListStorage.indexOf(findReadListUser)
	if (findUser && findReadListUser) {
		ReadingListStorage.splice(getReadListUserId, 1)
	}

	res.contentType("json")
	res.end(JSON.stringify(ReadingListStorage))
})

// обновляем читательный лист
router.put("/readinglist/:id", (req, res) => {
	const findUser = ReadingListStorage.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!findUser) {
		return res.end(`user ${req.params.id} not found`)
	}

	const position = ReadingListStorage.indexOf(findUser)
	if (findUser.booksIds.length >= 5) {
		return res.end(`You have more than 5 books. Pashol nahui`)
	}

	if (findUser && findUser.booksIds.length < 5) {
		const tmp = ReadingListStorage[position].booksIds
		tmp.push(Number(req.body.booksIds))
		ReadingListStorage[position] = { id: findUser.id, userId: req.body.userId, booksIds: tmp }
	}

	res.contentType("json")
	res.end(JSON.stringify(ReadingListStorage))
})

// получать читательный лист 
router.get("/readinglist", (req, res) => {

	res.contentType("json")
	res.end(JSON.stringify(ReadingListStorage))
})

// _________________________________________________________________________________________________________
// выдает всех юзееров
router.get("/users", (req, res) => {

	res.contentType("json")
	res.end(JSON.stringify(users))
})

//  Возвращает читательный лист юзера
router.get("/user/:id/readinglist", (req, res) => {
	const userBooksStorage = []
	const findUser = ReadingListStorage.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!findUser) {
		return res.end(`user ${req.params.id} not found`)
	}
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
// artem: :bookId должен передаваться в теле запроса
router.post("/user/:id/readinglist", (req, res) => {
	const bookId = Number(req.body.bookId)
	const userId = Number(req.params.id)

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

	res.contentType("json")
	res.end(JSON.stringify(updatedRL))
})

// выводит одного юзера +++
router.get("/users/:id", (req, res) => {
	const getUser = users.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!getUser) {
		return res.end(`user ${req.params.id} not found`)
	}
	res.contentType("json")
	res.end(JSON.stringify(getUser))
})

// обновляет юзера
//artem: обновляет юзера получая json с полями 
router.put("/users/:id", (req, res) => {
	const getUser = users.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!getUser) {
		return res.end(`user ${req.params.id} not found`)
	}

	const position = users.indexOf(getUser)
	users[position] = { id: getUser.id, userId: req.body.userId, name: req.body.name }

	res.contentType("json")
	res.end(JSON.stringify(users[position]))
})

// удаляем юзера
// artem: /users/:id 
router.delete("/users/:id", (req, res) => {
	const getUser = users.find((user) => {
		return user.id === Number(req.params.id)
	})
	if (!getUser) {
		return res.end(`user ${req.params.id} not found`)
	}
	const position = users.indexOf(getUser)
	users.splice(position, 1)

	if (users.length === 0) {
		return res.end("users array is empty")
	}

	res.contentType("json")
	res.end(JSON.stringify(users))
})

// создаем юзера 
//artem: coздаем юзера получая json с полями 
router.post("/users", (req, res) => {
	const userId = Number(req.body.userId)
	for (user of users) {
		if (user.userId === userId)
			return res.end(`user id ${userId} is already taken`)
	}
	const newUser = { id: users.length + 1, userId: req.body.userId, name: req.body.name }
	users.push(newUser)

	res.contentType("json")
	res.end(JSON.stringify(users))
})

// _________________________________________________________________________________________________________
// создает книгу по полям  { name: "Vitya", author: "2" } и добавляет в booksStorage 
router.post("/books/", (req, res) => {
	console.log("POST /books", req.body)

	const newBook = { id: booksStorage.length + 1, name: req.body.name, author: req.body.author }
	const lent = booksStorage.push(newBook)

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

// Выдает список всех книг в booksStorage
router.get("/books", (req, res) => {
	console.log("GET")

	res.contentType("json")
	res.end(JSON.stringify(booksStorage))
})

// обновлять книгу
router.put("/books/:id", (req, res) => {
	const findBook = booksStorage.find((book) => {
		return book.id === Number(req.params.id)
	})
	if (!findBook) {
		res.end("Книга не найдена")
		return
	}
	const place = booksStorage.indexOf(findBook)
	booksStorage[place] = { id: findBook.id, name: req.body.name, author: req.body.author }

	res.contentType("json")
	res.end(JSON.stringify(booksStorage[place]))
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

app.use(router)

app.listen(3000, () => {
	console.log("process.pid", process.pid)
	console.log("RUNNIN")
})

// КНИГА

// создает книгу по полям  { name: "Vitya", author: "2" } и добавляет в booksStorage  +++ -
// router.post("/books/"

// удаляет книгу по айди +++ +
// router.delete("/books/:id"

// выдает список всех книг в booksStorage +++ +
// router.get("/books"

// обновлять книгу +++ -
//router.put("/books/:id"

// выдает инфу по книге (весь объект) +++ +
// router.get("/books/:id"

// ЮЗЕР

// выводит всех юзеров +++ 
// router.get("/users"

// вовращает читательный лист юзера +++ +
// router.get("/user/:id/readinglist

// добавляет юзеру книжку +++ -
// router.post("/user/:id/readinglist

// выводит одного юзера +++ -
// router.get("/users/:id"

// обновляет юзера +++ -
// router.put("/users/:id"

// удаляем юзера +++ -
// router.delete("/users/:id"

// создаем юзера +++ -
// router.post("/users"

// ЧИТАТЕЛЬНЫЙ ЛИСТ

// создавать чительный лист +++ -
// router.post("/readinglist/:id

// удалять читательный лист +++ -
// router.delete("/readinglist/:id

// обновляем читательный лист +_+ -
// router.put("/readinglist/:id"

// получать читательный лист +++ +
// router.get("/readinglist"

// АВТОР

// создать автора +++ -
// router.post("/authors"

// удалить автора +++ -
// router.delete("/authors/:id"

// обновить автора +++ -
// router.put("/authors/:id"

// получить автора - -
// router.get("/authors/:id"

// получить всех авторов +++ +
// router.get("/authors"

// выдает все книги автора +++ +
// router.get("/authors/:id/books"



// сгрупировать все роуты под тз
// https://github.com/Kikobeats/awesome-api
// пофиксить пути на всех рутах шобы они были R3ST

