import express from "express"

import router from "./router"
import { UserRepository } from "./user/user-repository"

async function main() {
    const app = express()


    app.use(express.json())

    const userRepo = new UserRepository()


    // выводит одного юзера
    router.get("/users/:id", (req, res) => {
        const user = userRepo.findUserById(Number(req.params.id))

        res.contentType("json")
        res.end(JSON.stringify(user))
    })

    // обновляет юзера
    router.put("/users/:id", (req, res) => {
        const updatedUser = userRepo.updateById(req.params.id, {})


        res.contentType("json")
        res.end(JSON.stringify(updatedUser))
    })

    app.use(router)

    app.listen(3000, () => console.log("runnin"))
}

main()