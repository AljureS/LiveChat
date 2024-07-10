//! LOGIC FOR A STUDENT PROFFESOR NAMESPACES

const user = prompt("Enter you user")

const profes =["Retax", "JuanDC", "Luis"]

let socketNameSpace, group; // va a ahcer la funcion de //* const socket =io()

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if (profes.includes(user)) {
    socketNameSpace= io("/support")
    group = "support"

} else {    
    socketNameSpace= io("/users")
    group = "users"

}

socketNameSpace.on("connect", ()=>{
    namespace.textContent = group
})



