import React, { useEffect, useState } from 'react'
import './App.css'
import ScrollToBottom from "react-scroll-to-bottom";
import ChatIcon from '@mui/icons-material/Chat';
import IosShareIcon from '@mui/icons-material/IosShare';

function Message({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                name: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ": " + new Date(Date.now()).getMinutes()
            }
            //emitter2
            await socket.emit('send_message', messageData)
            setMessageList((prevlist) => [...prevlist, messageData]);
            setCurrentMessage("");
        }
    }
    useEffect(() => {
        //listener01
        socket.on("receive_message", (data) => {
            setMessageList((prevlist) => [...prevlist, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'>
               <ChatIcon style={{ color: 'red', fontSize: 'medium' }}/>
                <p>JUSTCHAT❗</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className="message-container">
                    {
                        messageList.map((messageContent) => {
                            return (
                                <div
                                    className="message" key={messageContent.time}
                                    id={username === messageContent.name ? "you" : "other"}
                                >
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="name">{messageContent.name}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder='Type a message....'
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}><IosShareIcon color="primary" fontSize='large'/></button>
            </div>
        </div>
    )
}

export default Message;
