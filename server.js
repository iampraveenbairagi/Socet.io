const express=require('express');
const app=express()
const http=require('http').createServer(app)
const notifier = require('node-notifier');
// const socket = require("socket.io");

app.use(express.static(__dirname + '/public'))

const io=require('socket.io')(http);

http.listen(2009,()=>{
  console.log("Server connected");
 
  io.on("connection", function (socket) {
      console.log("User " + socket.id);

      socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
      });

      socket.on("message", function (message) {
        socket.broadcast.emit(notifier.notify((message)))
      })
  });
});