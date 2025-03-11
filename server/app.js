const {Server} = require('socket.io') // why socket io, because websocket is very low level it annot broadcast to all users. socket io helps us fall back to long polling

const http = require("http")

const httpServer = http.createServer();
httpServer.listen(3002)

// instantiated

const io = new Server(httpServer, {
  cors: {
    origin: "*" // any one can come. if we want to restrict use origin:["http://localhost:3000", "kind of"]
  }
})

io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`)
  
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  })
})