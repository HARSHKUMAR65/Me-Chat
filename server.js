const express = require('express');
const socket = require('socket.io');
const app = express();
const http = require('http').createServer(app)
app.use(express.static(__dirname,+'/public'))
var PORT = process.env.PORT || 3030;

//render index page 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

// start server
const server =  app.listen(PORT, ()=>{
    console.log(`server is running on port  ${PORT}`)
})
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})