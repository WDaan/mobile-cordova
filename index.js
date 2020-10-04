const port = process.env.PORT || 8282
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port })

wss.on('connection', ws => {
    ws.on('message', data => {
        // sends the data to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    })
})

console.log(`Server is up on port ${port}!`)
