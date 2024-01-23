import './App.css';
import {useState,useEffect} from 'react';
import {nanoid} from "nanoid";
import SideBar from './components/sideBar';
import Chat from './components/Chat';
import socket from './components/socket';
const userName = nanoid(4);
function App() {
  const [message,setMessage] = useState("");
  const [chat,setChat] = useState([]);
  const sendChat = (e)=>{
       e.preventDefault();
       socket.emit("chat",{message,userName});
       setMessage('')
  }
  useEffect(()=>{
      socket.on('chat',(payload)=>{
        setChat([...chat,payload])
      })
  })
  return (
    <div className="App">
      <header className="App-header">
         <h1>Chatty App</h1>
      </header>
      <div className='outerBox'>
          <SideBar/>
          <Chat/>
      </div>
    </div>
  );
}

export default App;
