import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer';
let user;
const sendUser = () => {

    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}
const Join = () => {
    const [name, setname] = useState('')

    return (
        <>


            <div className='w3-container chat'>
                <div className='w3-card-4 container text-center'>
                    <img src="https://media.istockphoto.com/photos/one-like-social-media-notification-with-thumb-up-icon-picture-id1200899039" alt="Avatar" style={{ "width": "20%" }} />
                    <div className="container my-5">
                        <input onKeyPress={(e) => e.key === 'Enter' ? sendUser() : null} type="text" onChange={(e) => setname(e.target.value)} className="form-control" id="joinInput" placeholder="Enter name" name="name" />
                        <br />
                        <br />
                        <Link onClick={(e) => !name ? e.preventDefault() : null} to='/chat'>  <button onClick={sendUser} className="btn  mb-5" style={{ "width": "100%", 'backgroundColor': '#196b87', 'border': '#196b87', 'color': 'white' }}>Login</button></Link>
                        <br />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Join
export { user }
