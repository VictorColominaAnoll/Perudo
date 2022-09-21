const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors());

const server = http.createServer(app);

const players = [];
let currentPlayerCounter = 0;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("new_player", (data) => {
        console.log("Received", data)
        addNewPlayer(data.name)
        socket.broadcast.emit("receive_message", data)
    })

    socket.on("get_game_data", () => {
        console.log(players)
        socket.emit("update_game_data", { current_player: players[currentPlayerCounter], players })
    })

    socket.on("next_turn", () => {
        currentPlayerCounter = getNewCurrentPlayer();
        socket.emit("update_game_data", { current_player: players[currentPlayerCounter], players })
    })
})

function getNewCurrentPlayer() {
    let newValue = currentPlayerCounter + 1;
    if (newValue > players.length - 1)
        newValue = 0;
    return newValue;
}

const addNewPlayer = (name) => {
    if (players.lastIndexOf(name) === -1)
        players.push(name);
}

server.listen(3001, () => {
    console.log("RUNNING");
})