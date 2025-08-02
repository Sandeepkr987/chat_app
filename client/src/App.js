import React, { useState } from 'react';
import './App.css'
import io from 'socket.io-client';
import Message from './Message';
import ChatIcon from '@mui/icons-material/Chat';

const socket = io.connect("https://chat-app-lq10.onrender.com");

function App() {
  const [username, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      //emitter01
      socket.emit("join_room", room)
      setShow(true)
    }
  }
  return (
    <div>
       { !show ? (
        <div className="box">
          <div>
            <span className="text-center">
              <ChatIcon style={{ color: 'red', fontSize: 'medium' }}/> JUSTCHAT❗
            </span>
            <div className="input-container">
              <input
                type='text'
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <label>Name</label>
            </div>
            <div className="input-container">
              <input
                type='text'
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <label>Room</label>
            </div>
            <button className='btn' type='submit' onClick={joinRoom}>submit</button>
          </div>
        </div>
      ) : (
        <Message socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
