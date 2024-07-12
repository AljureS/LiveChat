//! LOGIC FOR A STUDENT PROFFESOR NAMESPACES

const user = prompt("Enter you user")

const support =["Retax", "JuanDC", "Luis", "Sara"]

let socketNameSpace, group; // va a ahcer la funcion de //* const socket =io()

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if (support.includes(user)) {
    socketNameSpace= io("/support") 
    group = "support"

} else {    
    socketNameSpace= io("/users")
    group = "users"

}

socketNameSpace.on("connect", ()=>{
    namespace.textContent = group
})

//! Message logic 

const sendMessage = document.querySelector('#sendMessage')
sendMessage.addEventListener("click", ()=> {
    
    const msg = prompt('Write your message')
    socketNameSpace.emit("sendMessage", {user, msg})

})

socketNameSpace.on('message', (data)=> {
    const {user, msg} = data
    const chat = document.querySelector('#chat')

    
})


