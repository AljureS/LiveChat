
const socket = io();

const send = document.querySelector('#send-message');
const allMessages = document.querySelector('#all-messages');

function getCurrentTime(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

send.addEventListener('click', () => {
    const message = document.querySelector('#message');

    socket.emit("message", message.value)

    message.value =""
})

socket.on("message", ({user, message}) => {
    const time = getCurrentTime();
    const msg = document.createRange().createContextualFragment(`
        <div class="message">
            <div class="image-container">
                    <img src="https://res.cloudinary.com/dqowrhckh/image/upload/v1721745406/saidchat_hvhobb.webp">
            </div>
            <div class="message-body">
                <div class="user-info">
                    <span class="username">${user}</span>
                    <span class="time">Send at: ${time}</span>
            </div>
            <p>${message}</p>
            </div>
        </div>
    `)

    allMessages.appendChild(msg)
})