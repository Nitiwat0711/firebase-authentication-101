import React, {useContext, useState, useEffect} from 'react';
import { auth,  googleProvider, microsoftProvider } from '../firebase'



const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateDisplayName(firstname, lastname) {
        return currentUser.updateProfile({
            displayName: `${firstname} ${lastname}`
        })
    }

    async function loginWithgoogle() {
        return await auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    async function loginWithMicrosoft() {
        microsoftProvider.setCustomParameters({
            prompt: "consent",
            tenant: process.env.REACT_APP_MICROSOFT_IDENTITY_TENANT_ID
          })
        return await auth.signInWithPopup(microsoftProvider).then((res) => {
            console.log(res.user)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(()=> {
        const unsubscribe =  auth.onAuthStateChanged(user => {
            
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

   

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail, 
        updatePassword,
        updateDisplayName,
        loginWithgoogle,
        loginWithMicrosoft
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
