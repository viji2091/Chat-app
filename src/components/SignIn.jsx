import React, { useContext }  from 'react'
import { auth, googleProvider, db } from '../firebase-config'
import { signInWithPopup } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid'; 
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignIn = ({ setIsAuth ,setLinkId}) => {

    // const {linkId, setLinkId} = useContext(MyContext);

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            cookies.set("auth-token", res.user.refreshToken);
            setIsAuth(true);

            const newLinkId = uuidv4();
            setLinkId(newLinkId) 
            localStorage.setItem('linkId', JSON.stringify(newLinkId));
            

        } catch (err) {
            console.log('Error during sign-in or session creation:',err);
        }
    }



    return (
        <div className='bg-blue-50'>
            <h1 className='p-24 pb-0 text-2xl font-bold'>Group chat with anyone,anywhere</h1>
            <button className='m-24 px-6 py-4 bg-blue-700 rounded-sm text-2xl' onClick={signInWithGoogle}>Sign In</button>
        </div>
    )
}

export default SignIn



