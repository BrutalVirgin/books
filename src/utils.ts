import fs from "fs"

// todo fix too large number issue
export const genId = () => Math.round(Math.random() * 1000000000000000)

// export const newDate = (str: string) => str.replace(/@\{(\w+)\}/g, (key, value: string) => {
//     if (value === "currentdate") {
//         return String(new Date());
//     }
//     if (value !== "currentdate") {
//         return value
//     }
// })

export const dateForJson = JSON.stringify(new Date())

export const createFile = (path: string, data: string): void => {
    fs.writeFileSync(path, data)
}
