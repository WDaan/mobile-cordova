module.exports = {
    apps: [
        {
            name: 'Chat',
            script: 'index.js',

            instances: 1,
            autorestart: true,
            max_memory_restart: '1G'
        }
    ]
}
