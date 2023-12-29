import React from 'react'

const Avatar = ({ auth }) => {

    return (
        <div className="avatar">
            {
                auth.avatar ? (
                    <img src={auth.avatar} alt="" srcset="" />
                ) : (
                    auth.name.charAt(0).toUpperCase()
                )
            }
        </div>
    )
}

export default Avatar
