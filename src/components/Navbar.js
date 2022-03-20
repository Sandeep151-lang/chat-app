import React from 'react'

export const Navbar = () => {
    return (
        <>
            <nav className='w3-card-4 d-flex'>
                {/* <img className='mx-4 my-1' src='https://freepngimg.com/thumb/chat/8-2-chat-download-png.png' height='80%' alt='image' style={{ 'borderRadius': '55%' }} /> */}
                <img className='mx-4 my-1' src='https://freepngimg.com/thumb/chat/8-2-chat-download-png.png' height='80%' alt='avatar' style={{ 'borderRadius': '55%' }} />
                <p className=' text-white live-chat'>Live Chat</p>
            </nav>
        </>
    )
}
