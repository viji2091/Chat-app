import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import SignOut from "./SignOut";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import "../styles/Chat.css";

const Chat = ({ linkId, setLinkId, setIsAuth, setIsInChat }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");
    const creatorId = localStorage.getItem('creatorId')
    const [alertShown, setAlertShown] = useState(false)
    useEffect(() => {


        const queryMessages = query(
            messagesRef,
            where("linkId", "==", linkId),
            orderBy("createdAt")
        );


        const realTimeListener = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });


        const queryExpired = query(
            messagesRef,
            where("linkId", "==", linkId),
            where("isExpired", "==", true)
        );




        const unsubscribeExpired = onSnapshot(queryExpired, (snapshot) => {
            if (!snapshot.empty && !alertShown) {
                const creatorId = localStorage.getItem('creatorId')
                if (!creatorId)
                    alert('This chat session has expired');
                setAlertShown(true);
                setIsInChat(false);
                localStorage.setItem('isInChat', 'false');
                localStorage.setItem(`alert-shown`, 'true');
            }
        });
        return () => {
            realTimeListener();
            unsubscribeExpired();
        }
    }, []);






    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            linkId,
            isExpired: false,
            creatorId
        });

        setNewMessage("");
    };

    const handleBack = () => {
        setIsInChat(false);
        localStorage.setItem('isInChat', 'false')
    }

    return (
        <>
            <div className="bg-blue-50">
                <div className="p-11 text-center font-bold text-2xl">
                    <h1>Welcome to the group  </h1>
                </div>
                <div className="bg-blue-100 mx-10 p-5 h-[70%] overflow-auto	">
                    {messages.map((message) => (
                        <div key={message.id} className="message">
                            <span className="user">{message.user}:</span> {message.text}
                        </div>
                    ))}
                </div>
                <div className="  px-10">
                    <form onSubmit={handleSubmit} className="new-message-form  bg-blue-300">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(event) => setNewMessage(event.target.value)}
                            className="new-message-input"
                            placeholder="Type your message here..."
                        />
                        <button type="submit" className="bg-blue-700 p-3 rounded-md">
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex justify-between p-6">
                <button className="px-6 py-3 bg-blue-700 rounded-sm text-xl" onClick={handleBack}>Back</button>
                <SignOut setLinkId={setLinkId} setIsAuth={setIsAuth} setIsInChat={setIsInChat} />
            </div>
        </>
    );
};

export default Chat;



