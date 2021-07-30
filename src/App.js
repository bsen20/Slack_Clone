import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';

import './App.css';
import Chat from './Components/Chat';
import { auth } from './Components/firebase';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import {useAuthState} from "react-firebase-hooks/auth"
import Login from './Components/Login';
import Spinner from "react-spinkit"

function App() {
  const [user,loading] = useAuthState(auth);
  if(loading){
    return(
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-1024-80.jpg.webp"/>
          <Spinner
          name = "ball-spin-fade-loader"
          color="purple"
          fadeIn="none"
           />

        </AppLoadingContents>
      </AppLoading>
    )
  }
  return (

    <div className="app">
      <Router>
        {!user ?(
          <Login/>
        ):(
          <>
          <Header/>
          <AppBody>

            <Sidebar/>
            <Switch>
              <Route path="/" exact>
                <Chat/>
              </Route>
            </Switch>
          </AppBody>
          </>
        )}
        
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div `
  display: flex;
  height: 100vh;

 
`;
const AppLoading = styled.div`

height: 100vh;
display: grid;
place-items: center;
/* flex-direction: column;
justify-content: center;
align-items: center; */
`;
const AppLoadingContents = styled.div`
display: flex;
text-align:center;
padding-bottom: 100px;
align-items: center;
flex-direction: column;
justify-content: center;
>img{
  height: 100px;
  padding: 20px;
  margin-bottom: 20px;
}
`;
