const socket = io("ws://localhost:3002")

const form = document.querySelector("form")
function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input")
  if(input.value) {
    
    socket.emit("message",input.value)
    input.value = "";
  }
}

form.addEventListener("submit", sendMessage)

socket.on("message", (data) => {
  console.log(data, "recieved from a server")
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li)
})

input.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5))
})

socket.on("activity", (name) => {
  
})