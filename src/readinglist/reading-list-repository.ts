//import { User } from "../user/user"
import { resolve } from "path"
//import { readFileSync } from "fs"
import { ReadingList } from "./interfaces"
import { createFile } from "../utils"
import fs, { readFileSync } from "fs"

export class ReadingListRepository {
    constructor() {
        this.load()
    }


    private FILE_PATH = resolve("./src/JSONs/reading-list.json")
    //private file = "name: asdasd"

    private _readingListStorage: ReadingList[] = [
        { id: 1, booksIds: [1, 3, 6,], updatedAt: new Date(), userId: 1 },
        { id: 1, booksIds: [5, 1], updatedAt: new Date(), userId: 1 },
        { id: 2, booksIds: [4], updatedAt: new Date(), userId: 2 },
        { id: 3, booksIds: [2, 5], updatedAt: new Date(), userId: 3 },
    ]

    private load() {
        console.log(`loading data for ${this.constructor.name} at path: `, this.FILE_PATH)

        const isFileExitst = this.checkIfFileExitst(this.FILE_PATH) /// zdelat

        if (!isFileExitst) {
            console.log(`file not found ${this.FILE_PATH}, creating new one`)
            createFile(this.FILE_PATH, JSON.stringify([])) /// zdelat

            return
        }

        console.log(`reading content`)

        // const fileContent = readFileSync(this.FILE_PATH)
        const fileContent1 = this.save()

        // this._readingListStorage = this.deserialize(fileContent) /// zdelat

        // console.log(this._readingListStorage)
        console.log(fileContent1)
    }

    private data = { id: 1, booksIds: [1, 3, 6,], updatedAt: new Date(), userId: 1 }

    save(): String {
        const newFile = this.deserialize(readFileSync(this.FILE_PATH))
        newFile.push(this.data)
        fs.readFile(this.FILE_PATH, (err) => {
            if (err) {
                throw err
            }
            fs.appendFile(this.FILE_PATH, String(newFile), (err) => {
                if (err) {
                    throw err
                }
            })
        })
        return JSON.stringify(this.data)
    }

    deserialize(file: Buffer): ReadingList[] {

        try {
            return JSON.parse(file.toString())
        } catch (error) {
            throw new Error("invalid content type")

        }
    }

    checkIfFileExitst(path: string): Boolean {
        try {
            fs.readFileSync(path)
            return true
        } catch (e) {
            return false
        }
    }


    // persist(data:ReadingList[]):Promise<void> {
    //     return Promise
    // }
    /**
     * Находит ридинг лист по айди ???
     * @param id 
     * @returns 
     */
    findById(id: number): ReadingList {
        const rl = this._readingListStorage.find(rl => rl.id === id)

        return rl!
    }

    /**
     * Находит юзера по user.id
     * @param userId 
     * @returns 
     */
    findByUserId(userId: number): ReadingList[] {
        return this._readingListStorage.filter(user => user.id === userId)
    }

    delete(userId: number): void {
        const position = this._readingListStorage.findIndex(x => x.id === userId)
        if (position !== -1) {
            this._readingListStorage.splice(position, 1)
            if (this._readingListStorage.length === 0) {
                throw new Error("repo is empty")
            }
        }
    }

    /**
     * Добавляет книгу в стораж
     * @param rl 
     */
    insert(rl: ReadingList): void {

        const existingRl = this._readingListStorage.find(_rl => _rl.id === rl.id)

        if (existingRl) {
            const position = this._readingListStorage.indexOf(existingRl)
            this._readingListStorage.splice(position, 1, rl)
        } else {
            this._readingListStorage = [...this._readingListStorage, rl]
        }

    }

    insertNewUSer(user: ReadingList): void {
        const newUser = this._readingListStorage.find(x => x.id === user.id)
        if (!newUser) {
            this._readingListStorage.push(user)
        }
    }

    /**
     * Возвращает весь список стораж
     * @returns 
     */
    findAll(): ReadingList[] {
        return this._readingListStorage
    }

}