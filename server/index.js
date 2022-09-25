const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors());

const server = http.createServer(app);

let turn = 1;
let players = [];
let currentPlayerCounter = 0;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

server.listen(3001, () => {
    console.log("RUNNING");
})

io.on("connection", (socket) => {
    socket.on("new_player", (data) => {
        addNewPlayer(data.name)

        console.log("NEW PLAYER", data)
        console.log("PLAYERS", players)
        console.log("--------------")

        socket.broadcast.emit("receive_message", data)
    })

    socket.on("get_game_data", () => {
        const newData = getCurrentGameData()

        console.log("GET DATA", newData)

        socket.emit("update_game_data", newData)
    })

    socket.on("next_turn", () => {
        turn += 1;
        currentPlayerCounter = getNewCurrentPlayer();
        const newData = getCurrentGameData()
        console.log("NEXT TURN", newData)
        io.emit("update_game_data", newData)
    })

    socket.on("reset_game", () => {
        turn = 1;
        players = [];
        currentPlayerCounter = 0;
    })
})

const getCurrentGameData = () => {
    return {
        current_player: players[currentPlayerCounter].name,
        players,
        turn
    }
};


function getNewCurrentPlayer() {
    let newValue = currentPlayerCounter + 1;
    if (newValue > players.length - 1)
        newValue = 0;
    return newValue;
}

const addNewPlayer = (newPlayerName) => {
    if (!doesPlayerExist(newPlayerName))
        players.push({ name: newPlayerName, dices: getRandomDices() });
}

const doesPlayerExist = (newPlayerName) => {
    let result = false;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === newPlayerName) {
            result = true;
            i = players.length
        }
    }

    return result;
}

const getRandomDices = () => {
    const result = []

    for (let id = 0; id < 5; id++) {
        result.push({
            id,
            value: Math.floor(Math.random() * (6 - 1 + 1) + 1)
        })
    }

    return result
}
