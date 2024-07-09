const socket = io()

const circle = document.querySelector('#circle')

const darwCircle = (position) => {

    circle.style.top= position.left
    circle.style.left= position.top
}

const drag = e => {
    
    const clientX = e.clientX
    const clientY = e.clientY

    const position={
        top: clientX + 'px', 
        left: clientY +'px'
    }

    darwCircle(position)
    socket.emit('circlePosition', position)

    // circle.style.top= clientY + 'px'
    // circle.style.left= clientX + 'px'
}

document.addEventListener('mousedown', e => {
    document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', e => {
    document.removeEventListener('mousemove', drag)
})

socket.on('moveCircle', position => {
    darwCircle(position)
})
