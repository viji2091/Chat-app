import React from 'react'
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase-config';
import { updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const SignOut = ({ setLinkId, setIsAuth, setIsInChat }) => {

    const handleSignOut = async () => {

        const linkId = JSON.parse(localStorage.getItem('linkId'));
        const creatorId = localStorage.getItem('creatorId');
        try {
            if (creatorId) {
                const q = query(collection(db, 'messages'), where('linkId', '==', linkId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const updatePromises = querySnapshot.docs.map(doc =>
                        updateDoc(doc.ref, { isExpired: true })
                    );

                    await Promise.all(updatePromises);
                    console.log(`All documents with linkId ${linkId} updated with isExpired: true`);

                } else {
                    console.error(`No document found with linkId: ${linkId}`);
                }
            }

            await signOut(auth); // Sign out the user
            localStorage.removeItem('linkId');
            localStorage.removeItem('isInChat');
            localStorage.removeItem('creatorId');
            setIsAuth(false);
            setLinkId(null); // Clear the linkId in context if needed
            setIsInChat(false)
            cookies.remove("auth-token")
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    return (
        <div>
            {console.log("SignOut component")}
            <button className='px-6 py-3 bg-blue-700 rounded-sm text-xl' onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default SignOut
