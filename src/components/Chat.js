import React, { useState, useEffect } from 'react'
import { user } from '../components/Join'
import socketIo from "socket.io-client"
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom';



const endpoint = `https://ecommerce-clone-projects.herokuapp.com/`
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
        <div className=' d-flex justify-content-evenly '>
            {/* <div>
                <img className='my-3' src='https://media.istockphoto.com/photos/live-chat-picture-id513300668?b=1&k=20&m=513300668&s=170667a&w=0&h=7Ua_ILJ4AofR3MnUz8ApeilwfJc9V08NtjI6MsPh0vk=' height='50%' width='50%' />
            </div> */}

            <div className='w3-card-4 mt-2 mb-5' style={{ 'width': '50%', 'height': '50%', borderRadius: '10px', 'borderColor': 'crimson' }}>
                <h2 className='my-2 text-center' style={{ 'backgroundColor': "rgb(36, 121, 170)", 'fontSize': '30px', 'fontFamily': 'Arial,cursive', borderRadius: '5px' }}>Chat</h2>

                <ScrollToBottom >
                    <div style={{ 'height': '320px' }} className='mess'>

                        {message.map((item, key) => {

                            return <Message key={key} users={item.id === id ? '' : item.user} message={item.message} classes={item.id === id ? `right` : `left`} />
                        })}

                    </div>
                </ScrollToBottom>

                <div className=" mt-1 d-flex">
                    <input onKeyPress={(e) => e.key === 'Enter' ? send() : null} type="text" className="form-control" id="message" placeholder="message" name="name" />
                    <button className='btn btn-chat' onClick={send}><i className="fas fa-caret-right" style={{ 'fontSize': '20px' }}></i></button>
                </div>
                <br />
            </div>

        </div>

    )
}

export default Chat
