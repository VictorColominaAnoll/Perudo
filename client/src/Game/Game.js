import './Game.css';
import { Button, Image } from "antd";
import { Row, Col } from "react-bootstrap"
import { List } from "antd";
import io from 'socket.io-client';
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");

export function Game() {

    const [dices, setDices] = useState([])
    const [currentTurn, setTurn] = useState(1)
    const [players, setPlayers] = useState([])
    const [isEndRound, setIsEndRound] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState([])

    useEffect(() => {
        socket.emit("get_game_data")
        socket.on('update_game_data', ({ current_player, players, turn }) => {
            setCurrentPlayer(current_player)
            setPlayers(players.map(({ name }) => name))
            setDices(getPlayerDices(current_player, players))
            setTurn(turn)

        })
    }, [socket])

    const nextTurn = () => {
        socket.emit("next_turn")
    }

    const getPlayerDices = (name, data) => {
        let dices = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === name) {
                dices = data[i].dices;
            }
        }

        return dices;
    }

    const endRound = () => {
        setIsEndRound(true)
    }

    return (
        <>
            <br></br>
            <Row>
                <Col></Col>
                <Col md={2}>
                    <List
                        header={<div>Jugadores</div>}
                        bordered
                        dataSource={players}
                        renderItem={(player) => (
                            <List.Item>
                                {player}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col></Col>
                <Col md={6} style={{ textAlign: "center" }}>
                    {
                        currentPlayer === localStorage.getItem("username")
                            ? (
                                <>
                                    {
                                        isEndRound
                                            ? (
                                                <div>
                                                    <h1>Ronda terminada</h1>
                                                </div>
                                            )
                                            : (
                                                <div data-testid="game-board">
                                                    <Row>
                                                        <Col>
                                                            <h3>Selecciona el palo:</h3>
                                                            <select data-testid="selector-dice-suit">
                                                                <option value="Toucan">Toucan</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                            </select>
                                                        </Col>
                                                    </Row>

                                                    <br></br>

                                                    <Row>
                                                        <Col>
                                                            <h3>Especifica el número:</h3>
                                                            <input type={"number"} min={1} data-testid="input-dice-number"></input>
                                                        </Col>
                                                    </Row>

                                                    <br></br>
                                                    <br></br>

                                                    <Row>
                                                        <Col></Col>
                                                        {
                                                            currentTurn === 1
                                                                ? (<></>)
                                                                : (
                                                                    <Col md={4}>
                                                                        <Button
                                                                            size='large'
                                                                            type="primary"
                                                                            onClick={() => endRound()}
                                                                            style={{
                                                                                borderColor: "#600404",
                                                                                background: "#a50d0d",
                                                                                width: "50%"
                                                                            }}
                                                                        >
                                                                            OBJECTION!
                                                                        </Button>
                                                                    </Col>
                                                                )

                                                        }
                                                        <Col md={4}>
                                                            <Button
                                                                size='large'
                                                                type="primary"
                                                                onClick={() => nextTurn()}
                                                                style={{
                                                                    borderColor: "green",
                                                                    background: "#28a328",
                                                                    width: "50%"
                                                                }}
                                                            >
                                                                Apostar
                                                            </Button>
                                                        </Col>
                                                        <Col></Col>
                                                    </Row>

                                                    <br></br>


                                                </div>
                                            )
                                    }
                                </>


                            )
                            : (
                                <>
                                    <h1>Turno actual del jugador: {currentPlayer}</h1>
                                </>
                            )
                    }
                </Col>
                <Col></Col>
                <Col md={2}>
                    <div data-testid="player-dices">
                        <List
                            header={<div>Tus dados</div>}
                            grid={{ column: 2 }}
                            bordered
                            dataSource={
                                dices.map(({ id, value }) => {
                                    return (
                                        <Image preview={false} width={50} id={"dice-" + (id + 1)} src={process.env.PUBLIC_URL + "/dice-" + value + ".jpg"} />
                                    )
                                })
                            }
                            renderItem={(dice) => (
                                <List.Item>
                                    <div style={{ marginTop: "10px" }}>
                                        {dice}
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}