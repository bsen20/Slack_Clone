import React from 'react'
import styled from 'styled-components'

function Message({message,timestamp,user,userImage}) {
    console.log(userImage)
    return (
        <MessageContainer>
            <img src={userImage}/>
            <MessageInfo>
                <h4>

                    {user}{' '}
                    <span>
                        {new Date(timestamp?.toDate()).toLocaleString()}
                    </span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div `
display:flex;
padding:20px;
align-items:center;
>img{
    height: 50px;
    border-radius: 8px;
}
`;

const MessageInfo = styled.div`
padding-left: 10px;
>h4>span{
    color: gray;
    font-size: 10px;
    margin-left: 4px;
}
`;
