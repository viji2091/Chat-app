
import './styles/input.css'
import SignIn from './components/SignIn';
import { auth } from "./firebase-config";
import React, { useState } from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import Cookies from "universal-cookie";
import logo from './assets/logo.svg'; 
const cookies = new Cookies();



function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [linkId, setLinkId] = useState(() => {
    const storedLinkId = localStorage.getItem('linkId');
    return storedLinkId ? JSON.parse(storedLinkId) : null;
  });
  const [isInChat, setIsInChat] = useState(localStorage.getItem('isInChat') === 'true');


  return (
    <div className="bg-blue-50">
      <div className='flex bg-blue-400 gap-4 px-7'>
        <img src={logo} alt='Logo' className='w-24' />
        <h1 className='text-6xl p-14 pl-0 '>Let's connect</h1>
      </div>
      <div>
        {!isAuth ? (
          <SignIn setIsAuth={setIsAuth} setLinkId={setLinkId} />
        ) : (
          !isInChat ? (
            <Home auth={auth} setIsInChat={setIsInChat} linkId={linkId} setLinkId={setLinkId} setIsAuth={setIsAuth} />
          ) : (
            <Chat linkId={linkId} setLinkId={setLinkId} setIsAuth={setIsAuth} setIsInChat={setIsInChat} />
          )
        )}
      </div>

    </div>
  );
}

export default App;
