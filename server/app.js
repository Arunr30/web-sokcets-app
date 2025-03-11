import { Server } from "socket.io"; // why socket io, because websocket is very low level it annot broadcast to all users. socket io helps us fall back to long polling
import express from "express"

const app = express();

const httpServer = app.listen(3002, () => {
  console.log("server is listening");
  
});



// instantiated

const io = new Server(httpServer, {
  cors: {
    origin: "*" // any one can come. if we want to restrict use origin:["http://localhost:3000", "kind of"]
  }
})

io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`)
  // upon connection - only to the current user
  socket.emit("message", "welcome to the chat app")

  // upon conncetion to all the user

  socket.broadcast.emit("message", `${socket.id.substring(0, 5)}: is connected"`)

  // upon disconnection

  socket.broadcast.emit("message", `${socket.id.substring(0, 5)}: is disconnected"`)

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name)
  })
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  })
})