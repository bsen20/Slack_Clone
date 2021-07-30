import React from 'react'
// import '../Styles/Header.css';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';


function Header() {
    const [user] = useAuthState(auth);
    return (
        <HeaderComponents>
            
            {/* Header left */}
            <HeaderLeft>
                <AccessTimeIcon/>
            </HeaderLeft>
            {/* Header serach */}
            <HeaderCenter>
                <input placeholder="Search React Learners"/>
                <SearchIcon/>
            </HeaderCenter>
            {/* Header right */}
            
            <HeaderRight>
                <HelpOutlineIcon/>
                <HeaderAvatar
                    //image to be add
                    onClick = {()=>auth.signOut()}
                    src={user?.photoURL}
                    alt = {user?.displayName}
                />
            </HeaderRight>
        </HeaderComponents>
    )
}

export default Header

const HeaderComponents = styled.div `
    display: flex;
    position: fixed;
    top:0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    background-color: var(--slack-color);
    .MuiSvgIcon-root{
        color: white;
        cursor: pointer;
        padding: 3px;
    }
    
`;

const HeaderLeft = styled.div `
    flex:0.25;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    .MuiSvgIcon-root:hover{
        /* opacity: 0.8; */
        border-radius: 2px;
        background-color: #562163;
    }
    
`;

const HeaderCenter = styled.div `
    flex:0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #421f44;
    opacity: 1;
    text-align: center;
    padding: 0 50px;
    color:white;
    border: 1px solid gray;

    >input{
        background-color: transparent;
        border: none;
        text-align: left;
        width: 100%;
        color: white;
        outline: 0;
    }
    :hover{
        border: 1px solid white;
    }
    .MuiSvgIcon-root:hover{
        /* opacity: 0.8; */
        border-radius: 2px;
        background-color: #562163;
    }
`;

const HeaderRight = styled.div `
    flex: 0.25;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 20px;
    
`;

const HeaderAvatar = styled(Avatar) `
    cursor: pointer;
    :hover{
        opacity: 0.8;
        
    }
    
`;

