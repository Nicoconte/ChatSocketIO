const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const PORT = 3000

const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
})


io.on('connection', (socket) => {
    console.log("Hey! :)")

    socket.on('disconnect', () => {
        console.log("Un usuario se fue :(")
    })

    socket.on("chat:message", (msg) => {
        console.log("Mensaje ", msg)
    })

    socket.on('chat:message', (msg) => {
        io.emit('chat:message', msg)
    })

})

server.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT} => http://localhost:3000`)
})

