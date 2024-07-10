const socket = io()

//3 buttons to emit connect to the rooms 
const connectRoom1 = document.querySelector('#joinRoom1')

const connectRoom2 = document.querySelector('#joinRoom2')

const connectRoom3 = document.querySelector('#joinRoom3')

//events for connection
connectRoom1.addEventListener('click', () => {
    socket.emit('joinRoom', 'room1')
})

connectRoom2.addEventListener('click', () => {
    socket.emit('joinRoom', 'room2')
})

connectRoom3.addEventListener('click', () => {
    socket.emit('joinRoom', 'room3')
})

//send message
const sendMessage = document.querySelector('#sendMessage')
