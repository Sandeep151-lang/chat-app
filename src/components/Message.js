import React from 'react'


const Message = ({ users, message, classes }) => {
    if (users) {
        return (
            <div className={`message ${classes}`}>
                {`${users}:  ${message}`}
            </div>
        )
    } else {
        return (
            <div className={`message right ${classes}`}>
                {`You: ${message}`}
            </div>
        )
    }


}

export default Message
