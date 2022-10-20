import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

//context 
export const AuthContext = createContext({})

// auth instance for configuration.
const auth = getAuth(app)

// all Providers 
const googleProvider = new GoogleAuthProvider();

const UseContext = ({ children }) => {
    // states.
    const [user, setUser] = useState({})

    //handlers.

    //1. createUserWithEmail
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //2. update name
    const updateName = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }
    //3. varify user
    const varifyUser = () => {
        return sendEmailVerification(auth.currentUser)
    }
    //4. signInWithGoogle
    const handlerGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    //5. signInWith email
    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //6. LogOut
    const LogOut = () => {
        //console.log('signout called');
        return signOut(auth)
    }


    //7. onauthStateChange
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })
        console.log(onAuthStateChanged);
        console.log(unSubscribe);
        return () => unSubscribe()
    }, [])

    //put the value here(in authInfo) what you want to sent by provider.
    const authInfo = {
        user,
        setUser,
        createUser,
        updateName,
        varifyUser,
        handlerGoogleSignIn,
        signInWithEmail,
        LogOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseContext;