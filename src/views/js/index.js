const socket = io({
    auth: {
        token: "mal"
    }
})

// in case of error
socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
    console.log(`connect_error due to ${err}`);
})

