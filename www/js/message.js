document.getElementById('connectButton').addEventListener('click', connect)
document.getElementById('sendMessage').addEventListener('click', sendMessage)

var client
var user

class Message {
    constructor(message, sender) {
        this.message = message
        this.sender = sender || 'not me'
        this.time = new Date()
    }

    static from(json) {
        return Object.assign(new Message(), json)
    }

    render() {
        const location = this.sender === user ? 'right-msg' : 'left-msg'
        const color = this.sender === user ? 'bg-teal-300' : 'bg-white'
        return `<div class="msg ${location}">
                    <div class="msg-bubble ${color}">
                        <div class="msg-info">
                            <div class="msg-info-name">${this.sender}</div>
                            <div class="msg-info-time">${this.getDate()}</div>
                        </div>

                        <div class="msg-text">
                            ${this.message}
                        </div>
                    </div>
                </div>`
    }

    getDate() {
        let time = this.time ? new Date(this.time) : new Date()
        return time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}

function connect() {
    const server = document.getElementById('server').value
    user = document.getElementById('user').value

    client = new WebSocket(server)

    client.onopen = function () {
        //remove connect form && show chat
        document.getElementById('connectForm').classList.add('hidden')
        document.getElementById('chatroom').classList.remove('hidden')
    }

    client.onmessage = function (event) {
        addMessage(Message.from(JSON.parse(event.data)))
    }
}

function addMessage(message) {
    if (!(message instanceof Message)) return

    const chat = document.getElementById('messageList')
    if (message.sender !== user)
        chat.insertAdjacentHTML('beforeend', message.render())
}

function sendMessage() {
    const input = document.getElementById('messageInput')

    const message = new Message(input.value, user)

    input.value = ''

    client.send(JSON.stringify(message))
    const chat = document.getElementById('messageList')
    chat.insertAdjacentHTML('beforeend', message.render())
    document.getElementById('scrollRef').scrollIntoView({ behavior: 'smooth' })
}
