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
    const [loader, setLoader] = useState(true)

    //-------------------
    //console.log(user);
    //console.log('after login')
    //--------------------

    //handlers.

    //1. createUserWithEmail
    const createUser = (email, password) => {
        console.log('after login email callded')
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //2. update name
    const updateName = (name) => {
        console.log('after login update name')
        return updateProfile(auth.currentUser, { displayName: name })
    }
    //3. varify user
    const varifyUser = () => {
        console.log('after login varify user')
        return sendEmailVerification(auth.currentUser)
    }
    //4. signInWithGoogle
    const handlerGoogleSignIn = () => {
        console.log('after login email callded')
        return signInWithPopup(auth, googleProvider)
    }
    //5. signInWith email
    const signInWithEmail = (email, password) => {
        console.log('after login button clicked');
        setLoader(true)
        console.log('set loader set true.');
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
            console.log('after login inside use effect', currentUser)
            setLoader(false)
            console.log('loader set to false');
        })
        //console.log(onAuthStateChanged);
        //console.log(unSubscribe);
        return () => unSubscribe()
    }, [])

    //console.log('after login useeffect passed')
    //put the value here(in authInfo) what you want to sent by provider.
    const authInfo = {
        user,
        setUser,
        createUser,
        updateName,
        varifyUser,
        handlerGoogleSignIn,
        signInWithEmail,
        LogOut,
        loader
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseContext;