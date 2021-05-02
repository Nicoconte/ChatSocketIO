$(document).ready(() => {
    const socket = io();

    const input = $("#message-input")
    const button = $("#send-message-btn")

    const chatTemplate = (text) => {
        return `<p> ${text} </p>`
    }

    const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

    const showTextWithEffect = (tag, text) => {
        $(tag).fadeIn("fast", () => {
            $(tag).text(text)
        })
    } 

    $(button).click((e) => {
        e.preventDefault()
        
        let value = $(input).val()

        if (value || value.length > 0) {
            socket.emit('chat:message', value)
            input.val(" ")
        }
    })

    $(input).keypress((e) => {
        socket.emit('notification:typing', "Alguien esta escribiendo...");
    })


    $(input).keyup((e) => {
        socket.emit('notification:typing', " ")
    })


    socket.on('chat:message', (msg) => {
        let container = $("#chat-container")

        container.append(chatTemplate(msg))

        scrollDown()
    })

    socket.on('notification:typing', (notification) => {
        $("#notification").text(notification);

        showTextWithEffect("#notification", notification)
    
    })

})