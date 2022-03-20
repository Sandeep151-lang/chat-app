import React from 'react'


const Message = ({ users, message, classes }) => {
    if (users) {
        return (
            <div className={`messagebox ${classes}`}>
                {`${users}:  ${message}`}
            </div>
        )
    } else {
        return (
            <div className={`messagebox right ${classes}`}>
                {`You: ${message}`}
            </div>
        )
    }


}

export default Message
