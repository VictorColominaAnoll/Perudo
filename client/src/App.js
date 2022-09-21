import './App.css';
import { Routes, Route } from "react-router-dom"
import { Lobby } from './Lobby/Lobby';
import { Game } from './Game/Game';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/game" element={<Game />}></Route>
      </Routes>
    </div >
  );
}

export default App;