import React from 'react'
import styled from 'styled-components'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SidebarOption from './SidebarOption';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {useCollection} from 'react-firebase-hooks/firestore';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
    const [channels] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>React Learners</h2>
                    <h3>

                    <FiberManualRecordIcon/>
                    {user.displayName}
                    </h3>
                </SidebarInfo>
                <CreateIcon/>
            </SidebarHeader>
            <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions & Reactions"/>
            <SidebarOption Icon={DraftsIcon} title="Saved items"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser"/>
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File browser"/>
            <SidebarOption Icon={ExpandLessIcon} title="show less"/>
            <hr/>
            <SidebarOption Icon={ExpandMoreIcon} title="Channels"/>
            <hr/>
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/>

            {channels?.docs.map(doc=>(
                <SidebarOption key={doc.id} id ={doc.id} title={doc.data().name} />
            ))}

        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div `
::-webkit-scrollbar {
  display: none;
}
overflow-y: scroll;
background-color: var(--slack-color);
flex:0.25;
margin-top: 50px;
  color: white;
  max-width: 332px;
  border: 1px solid #49274b;
  >hr{
      margin-top: 10px;
      margin-bottom: 10px;
      border:1px solid #49274b;
  }
`;

const SidebarHeader = styled.div `
display: flex;
border-bottom:1px solid #49274b;
padding:13px;

>.MuiSvgIcon-root{
    padding: 8px;
    color:#49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
}
`;

const SidebarInfo = styled.div `
flex:1;
>h2{
    font-size: 20px;
    font-weight:700;
    margin-bottom: 5px;
}
>h3{
    display:flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
}
>h3 > .MuiSvgIcon-root{
    color: green;
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
}
`;
