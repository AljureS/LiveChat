const socket = io()

//client listener
socket.on('welcomeMessage', (data) => { 
    text.textContent = data
})

//client emition
const emitToServer = document.querySelector('#emitToServer')
emitToServer.addEventListener('click', () => {
    socket.emit('serverWelcome', 'Hello Server this is a Client')
})

socket.on('everyone', (data) => {
    text2.textContent = data
})

const emitToLast = document.querySelector('#emitToLast')
emitToLast.addEventListener('click', () => {
    socket.emit('last', 'Hello 🫂')
})

socket.on('salute', (message) => {
    console.log(message);
})

//on, once off 
socket.on("on", ()=>{
    console.log('event that emits many times, as many as necesary');
})

socket.once("once", ()=>{
    console.log('event that emits one times');
})

const listener =()=>{
    console.log('event off');
}

socket.on('off', listener)

setTimeout(()=>{
    socket.off("off", listener)
}, 2000)