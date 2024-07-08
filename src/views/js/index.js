const socket = io()

const checkStatusSocket =() => {
    console.log('Socket Status: ', socket.connected)
}

socket.on('connect', () => {
    console.log('Socket connected: ', socket.id)
    checkStatusSocket()
})

socket.on('connect_error', ()=>{
    console.log('Reconnection failed')
})

socket.on('disconnect', () => {
    console.log('Socket ', socket.id, " is disconnected")
    checkStatusSocket()
})

socket.io.on('reconnect_attempt', () => {
    console.log('Waiting for reconection')
})

socket.io.on('reconnect', () => {
    console.log('I am back!!');
})