import io from 'socket.io-client';
import { useEffect, useState } from "react"
import { Button, Space } from "antd"
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"

const socket = io.connect("http://localhost:3001");

export function Lobby() {
    const redirect = useNavigate();

    const [playerName, setPlayerName] = useState("")
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        socket.emit("new_player", { name: playerName })
        localStorage.setItem("username", playerName)
        redirect("/game")
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessage(data.message)
        })
    }, [socket])

    return (
        <>
            <Row>
                <Col md={12} style={{ textAlign: "center" }}>
                    <h1>Introduce nombre de usuario</h1>

                    <Space>
                        <input style={{ width: "100%" }} data-testid="username-input" onChange={(event) => setPlayerName(event.target.value)}></input>
                        <Button type="primary" onClick={() => sendMessage()}>Jugar</Button>
                    </Space>
                </Col>
            </Row>

        </>
    )
}