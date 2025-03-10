const ws = require('ws');

// instantiated

const wsServer = new ws.WebSocketServer({
  port: 3001
})

wsServer.on("connection", (socket) => {
  console.log("connection established");
  
  socket.on("message", (data) => {
    const b = Buffer.from(data).toString();
    socket.send(`${b}`)
  })
})