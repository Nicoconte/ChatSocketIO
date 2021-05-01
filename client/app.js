$(document).ready(() => {
    const socket = io();

    const input = $("#message-input")
    const button = $("#send-message-btn")

    const chatTemplate = (text) => {
        return `<p> ${text} </p>`
    }

    const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

    $(button).click((e) => {
        e.preventDefault()
        
        let value = $(input).val()

        if (value || value.length > 0) {
            socket.emit('chat:message', value)
            input.val(" ")
        }
    })


    socket.on('chat:message', (msg) => {
        let container = $("#chat-container")

        container.append(chatTemplate(msg))

        scrollDown()
    })

})