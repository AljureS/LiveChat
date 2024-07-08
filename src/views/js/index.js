const socket = io()

const checkStatusSocket =() => {
    console.log('Socket Status: ', socket.connected)
}
