const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const http = require('http')
const server = http.createServer(app)


const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    }
}); 


io.on('connection', (socket) => {
    console.log(`connected to id:  ${socket.id}`)
    //listener01
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user joined with roomid: ${data}`)
    })
    //listener02 
    socket.on("send_message", (data) => {
        //emitter01
        socket.to(data.room).emit("receive_message", data)
    })
    //listener03
    socket.on("disconnect", () => {
        console.log(`disconnected from id: ${socket.id}`)
    })
})

server.listen(3001, () => {
    console.log(`listening on port-3001`)
})