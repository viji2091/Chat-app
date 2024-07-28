import React, { useContext, useState } from 'react'
import PopUp from './PopUp';
import SignOut from "./SignOut";
const Home = ({ auth, linkId, setLinkId, setIsInChat, setIsAuth }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnChange = (e) => {
        setLinkId(e.target.value)
        localStorage.setItem('linkId', JSON.stringify(e.target.value));

    }

    const handleCreateLink = () => {
        localStorage.setItem('creatorId', JSON.stringify(auth.currentUser.uid));
        setIsModalOpen(true);
    }


    const handleJoin = async () => {
        localStorage.setItem('isInChat', 'true');
        setIsInChat(true)
    }

    return (
        <div className='bg-blue-50'>
            {console.log("Home component")}
            <h2 className='p-11 text-center font-bold text-2xl'>Welcome, {auth.currentUser.displayName}</h2>
            <div className='flex p-4 items-center justify-center gap-4'>
                <button className='border-2 p-4 bg-blue-700' onClick={handleCreateLink}>New group Chat</button>
                <input name='Enter a link' placeholder='Enter a link' className='w-[30%] p-4 text-left bg-blue-300 '
                    onChange={handleOnChange}
                />
                <button className='font-medium' onClick={handleJoin}>Join</button>
            </div>
            <PopUp
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                linkId={linkId}
            />
            <div className='p-11 flex justify-center  '>
                <SignOut setLinkId={setLinkId} setIsAuth={setIsAuth} setIsInChat={setIsInChat} />
            </div>
        </div>
    )
}

export default Home
