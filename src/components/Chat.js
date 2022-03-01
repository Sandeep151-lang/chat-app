import React, { useState, useEffect } from 'react'
import { user } from '../components/Join'
import socketIo from "socket.io-client"
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';



const endpoint = `https://chat-app-projects.herokuapp.com/`
let socket
const Chat = () => {

    const [id, setid] = useState("")
    const [message, setmessage] = useState([])
    // if (message.length === 0) {
    //     history.push('/')
    // }
    const send = () => {
        const message = document.getElementById('message').value;
        socket.emit('message', { message, id });
        document.getElementById('message').value = ""
    }
    useEffect(() => {
        socket = socketIo(endpoint, { transports: ['websocket'] })
        socket.on('connect', () => {
            alert('connected');
            setid(socket.id)
        })
        console.log(socket)
        socket.emit('joined', { user })


        socket.on('welcome', (data) => {

            setmessage([...message, data])
            console.log(`welcome ${data.user} ${data.message}`)
        })

        return () => {
            socket.emit('disconnect');

            socket.off();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {

        socket.on('sendMessage', (data) => {

            setmessage([...message, data], data.user)

            // console.log(data.user, data.message, data.id)
        })
        socket.on('userjoined', (data) => {
            setmessage([...message, data])
            // console.log(`userjoined ${data.user} ${data.message}`)
        })
        socket.on('leave', (data) => {
            setmessage([...message, data])
            // console.log(`leave  ${data.message} ${data.user}`)
        })
        return () => {
            socket.off();
        }
    }, [message])


    return (
        <div className='container chats'>
            <div className='w3-container chat'>
                <div className='w3-card-4 mt-4'>
                    <h2 className='my-2' style={{ 'backgroundColor': '#008000b3', 'fontSize': '50px', 'fontFamily': 'Arial,cursive' }}>Chat</h2>

                    <hr />
                    <ScrollToBottom>
                        <div style={{ 'height': '320px' }}>

                            {message.map((item, key) => {

                                return <Message key={key} users={item.id === id ? '' : item.user} message={item.message} classes={item.id === id ? `right` : `left`} />
                            })}

                        </div>
                    </ScrollToBottom>
                    <hr />
                    <div className=" mt-1 d-flex">
                        <input onKeyPress={(e) => e.key === 'Enter' ? send() : null} type="text" className="form-control" id="message" placeholder="message" name="name" />
                        <button className='btn btn-success' onClick={send}><i className="fas fa-caret-right" style={{ 'fontSize': '50px' }}></i></button>
                    </div>
                    <br />
                </div>

            </div>
        </div>
    )
}

export default Chat
