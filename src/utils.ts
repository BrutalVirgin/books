// todo fix too large number issue
export const genId = () => Math.round(Math.random() * 1000000000000000)


export const user1 = (user: string) => user.replace(/@\{(\w+)\}/g, (match, group) => {
    if (group === 'currentdate') {
        return new Date();
    }
})

