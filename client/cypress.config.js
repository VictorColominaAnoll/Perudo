const { defineConfig } = require("cypress");
const io = require('socket.io-client')

let socket

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        connect(name) {
          console.log('Cypress is connecting to socket server under name %s', name)
          socket = io('http://localhost:3001')

          socket.emit("new_player", { name })

          return null
        },
      })
    },
  },
});
