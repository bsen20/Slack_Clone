import { Button } from '@material-ui/core'
import React from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import { auth, db } from './firebase';
import firebase from 'firebase';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


function ChatInput({channelName,channelId,chatRef}) {
    const [input,setInput] = useState('');
    const [user] = useAuthState(auth);
    

    console.log(channelId);

    const sendMessage = (e)=>{
        e.preventDefault();
        if(!channelId){
            return false;
        }
        db.collection('rooms').doc(channelId).collection('messages').add({
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            user:user.displayName,
            userImage:user.photoURL,
            

        });
        chatRef.current.scrollIntoView({
            behaviour:"smooth",
        })
        

        setInput('');

        
    }
    return (
        <ChatInputContainer>
            <form>
                <input value = {input} onChange={e=>setInput(e.target.value)} placeholder={`Message ${channelName}`}/>
                <Button hidden="true" type="submit" onClick = {sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div `
border-radius: 20px;

>form{
    position: relative;
    display: flex;
    justify-content: center;
}
>form >input{
    border-radius: 20px;
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
}
>form > button{
    display: none !important;
}
`;
