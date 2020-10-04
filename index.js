const express = require('express')
const app = express()

const server = app.listen(8282)

const io = require('socket.io').listen(server)

io.on('connection', socket => {
    socket.on('join', room => {
        socket.join(room)
    })
    socket.on('chat', message => {
        console.log(message)
        io.to(message.room).emit('chat', message)
    })
})

console.log('Server started on port 8282....')
