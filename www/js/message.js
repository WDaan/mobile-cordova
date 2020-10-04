document.getElementById('connectMQTT').addEventListener('click', connectMQTT)
document.getElementById('sendMessage').addEventListener('click', sendMessage)

var client
var user
var room

class Message {
    constructor(message, sender, room) {
        this.message = message
        this.sender = sender || 'not me'
        this.room = room
    }

    static from(json) {
        return Object.assign(new Message(), json)
    }

    render() {
        if (this.sender === user)
            return `<div class="clearfix">
                        <div class="bg-teal-500 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix"> ${this.message}</div>
                    </div>`

        return ` <div class="clearfix">
                    <div class="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">
                        ${this.message}
                    </div>
                </div>
                `
    }
}

function connectMQTT() {
    const server = document.getElementById('server').value
    room = document.getElementById('room').value
    user = document.getElementById('user').value

    client = io(server)

    client.on('connect', function () {
        //join the specific room
        client.emit('join', room)
        client.on(room, data => addMessage(Message.from(data)))
        //remove connect form && show chat
        document.getElementById('connectForm').classList.add('hidden')
        document.getElementById('chatroom').classList.remove('hidden')
    })
}

function addMessage(message) {
    if (!(message instanceof Message)) return

    const chat = document.getElementById('messageList')
    if (message.sender !== user)
        chat.insertAdjacentHTML('beforeend', message.render())
}

function sendMessage() {
    const input = document.getElementById('messageInput')

    const message = new Message(input.value, user, room)

    input.value = ''

    client.emit('chat', message)
    const chat = document.getElementById('messageList')
    chat.insertAdjacentHTML('beforeend', message.render())
    document.getElementById('scrollRef').scrollIntoView({ behavior: 'smooth' })
}
