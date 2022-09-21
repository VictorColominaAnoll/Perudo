import { Row, Col, Button } from "antd";
import { List } from "antd";
import io from 'socket.io-client';
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");

export function Game() {

    const [players, setPlayer] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState([])

    useEffect(() => {
        socket.emit("get_game_data")
        socket.on('update_game_data', ({ current_player, players }) => {
            setCurrentPlayer(current_player)
            setPlayer(players)
        })
    }, [socket])

    const nextTurn = () => {
        socket.emit("next_turn")
    }

    return (
        <>
            <br></br>
            <Row>
                <Col md={4}>
                    <List
                        header={<div>Players</div>}
                        bordered
                        dataSource={players}
                        renderItem={(player) => (
                            <List.Item>
                                {player}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col style={{ textAlign: "center" }}>
                    {
                        currentPlayer === localStorage.getItem("username")
                            ? (
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
                                            <input data-testid="input-dice-number"></input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button type="primary" onClick={() => nextTurn()}>Apostar</Button>
                                    </Row>
                                </div>
                            )
                            : (
                                <>
                                    <h1>Turno actual del jugador: {currentPlayer}</h1>
                                </>
                            )
                    }
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}