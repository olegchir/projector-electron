import app from './ExpressApp'

// Starter for the Express mode to debug UI
export function start():void {
    const port = process.env.PORT || 3000

    app.listen(port, (err:any) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port}`)
    })
}
