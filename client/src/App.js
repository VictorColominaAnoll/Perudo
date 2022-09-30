import './App.css';
import { Routes, Route } from "react-router-dom"
import { Lobby } from './Lobby/Lobby';
import { Game } from './Game/Game';
import { Card } from 'antd';

function App() {

  return (
    <div className="App">
        <Card style={{ borderRadius: "10px", }}>
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/game" element={<Game />}></Route>
          </Routes>
        </Card>
    </div >
  );
}

export default App;