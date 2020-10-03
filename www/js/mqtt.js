document.getElementById('connectMQTT').addEventListener('click', connectMQTT)
document.getElementById('sendMessage').addEventListener('click', sendMessage)

var client
var channel

function connectMQTT() {
    const server = document.getElementById('server').value
    channel = document.getElementById('channel').value

    client = mqtt.connect(server)
    client.subscribe(channel)
    client.on('message', function (topic, payload) {
        let sender, message
        try {
            const data = JSON.parse(payload)
            sender = data.sender
            message = data.value
        } catch (e) {
            sender = 'someone else'
            message = payload
        }

        addMessage(new Message(message, sender))
    })

    //remove connect window && show chat
    document.getElementById('connectForm').classList.add('hidden')
    document.getElementById('chatroom').classList.remove('hidden')
}

class Message {
    constructor(value, sender) {
        this.value = value
        this.sender = sender || 'not me'
    }

    render() {
        if (this.sender === 'me')
            return `<div class="clearfix">
                        <div class="bg-teal-500 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix"> ${this.value} </div>
                    </div>`

        return ` <div class="clearfix">
                    <div class="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">
                        ${this.value}
                    </div>
                </div>
                `
    }
}

function addMessage(message) {
    if (!(message instanceof Message)) return

    const chat = document.getElementById('messageList')
    if (message.sender != 'me')
        chat.insertAdjacentHTML('beforeend', message.render())
}

function sendMessage() {
    const input = document.getElementById('messageInput')

    const message = new Message(input.value, 'me')

    input.value = ''

    client.publish(channel, JSON.stringify(message))
    const chat = document.getElementById('messageList')
    chat.insertAdjacentHTML('beforeend', message.render())
}
