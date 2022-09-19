import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react"
const socket = io.connect("http://localhost:3001");

function App() {
  const [newMessage, setNewMessage] = useState("")
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message: newMessage })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <br></br>

      <div>
        <span><strong>Last message:</strong> {message}</span>
      </div>

      <br></br>

      <div>
        <input onChange={(event) => setNewMessage(event.target.value)}></input>
        <button onClick={() => sendMessage()}>Send message</button>
      </div>

    </div>
  );
}

export default App;