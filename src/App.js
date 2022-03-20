import socket from 'socket.io-client'
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from './components/Join';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Chat from './components/Chat';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';

const endpoint = `http://localhost:4000/`;
const socketIo = socket(endpoint, { transports: ['websocket'] })

function App() {
  socketIo.on('connection', () => {
    alert('connected')
  })
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path='/' component={Join} />
        <Route path='/chat' component={Chat} />

      </Router>

    </div>
  );
}

export default App;
