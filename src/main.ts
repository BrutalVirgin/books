import express from "express"

import router from "./router"
import { UserRepository } from "./user/user-repository"

async function main() {
    const app = express()

    app.use(router)
    app.use(express.json())

    const userRepo = new UserRepository()

    router.get("/users/:id", (req, res) => {
        const user = userRepo.findUserById(Number(req.params.id))

        res.contentType("json")
        res.end(JSON.stringify(user))
    })

    app.listen(3000, () => {
        console.log("process.pid", process.pid)
        console.log("RUNNIN")
    })
}

main()