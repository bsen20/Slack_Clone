import React from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from './firebase';
import Message from './Message';
import { useRef } from 'react';
import { useEffect } from 'react';


function Chat() {

    const chatRef = useRef(null);

    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages,loading] = useCollection(
        roomId &&
            db
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")

    )
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior:"smooth",
        });
    }, [roomId,loading]);
    // console.log(roomDetails)
    // console.log(roomMessages)
    // console.log(roomId);
    return (
        <ChatContainer>
            {/* <h1>This is the chat sections</h1> */}
            {roomDetails && roomMessages && (

                <>
                <Header>
                    <HeaderLeft>
                        <h4><strong>#{roomDetails?.data().name}</strong></h4>
                        <StarBorderOutlinedIcon/>
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon/>Details
                        </p>
                    </HeaderRight>

                </Header>
                <ChatMessages>
                    {/* Fetch all the messages */}
                    {roomMessages?.docs.map(doc=>{
                        const {message,timestamp,user,userImage} = doc.data();
                        console.log(userImage)
                        return (
                            <Message
                                key = {doc.id}
                                message = {message}
                                timestamp = {timestamp}
                                user = {user}
                                userImage = {userImage}
                            />
                        )
                    })}
                    <ChatBottom ref = {chatRef}/>
                </ChatMessages>
                <ChatInput
                    chatRef={chatRef}
                    channelName = {roomDetails?.data().name}
                    channelId = {roomId}
                />
            </>

            )}
            
        </ChatContainer>
    )
}

export default Chat

const ChatMessages = styled.div ``;

const Header = styled.div `
display: flex;
justify-content: space-between;
padding:20px;
border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div `
/* position: fixed;
top:80px; */
display: flex;
align-items: center;
>h4{
    display: flex;
    text-transform: lowercase;
    font-size: 18px;
    margin-right: 10px;
    /* display: ; */
}
>h4 > .MuiSvgIcon-root{
    margin-left: 20px;
    font-size: 18px;
}
`;
const HeaderRight = styled.div `
>p{
    display: flex;
    align-items: center;
    font-size: 14px;
}
>p >.MuiSvgIcon-root{
    margin-right:5px !important;
    font-size: 16px;
}
`;

const ChatContainer = styled.div `
    color: black;
    z-index:999;
    flex:0.75;
    flex-grow: 1;
    overflow: scroll;
    margin-top: 48px;
`;

const ChatBottom = styled.div`
padding-bottom: 200px;
`;