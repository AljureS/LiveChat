const socket = io()

socket.on('welcomeMessage', (data) => { 
    text.textContent = data
})

const emitToServer = document.querySelector('#emitToServer')
emitToServer.addEventListener('click', () => {
    socket.emit('serverWelcome', 'Hello Server this is a Client')
})

socket.on('everyone', (data) => {
    text2.textContent = data
})