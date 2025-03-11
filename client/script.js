const socket = new WebSocket("ws://localhost:3002")

const form = document.querySelector("form")
function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input")
  if(input.value) {
    
    socket.send(input.value)
    input.value = "";
  }
}

form.addEventListener("submit", sendMessage)

socket.addEventListener("message", ({data}) => {
  console.log(data, "recieved from a server")
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = data;
  ul.appendChild(li)
})
