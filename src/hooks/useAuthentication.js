import {
    
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import {auth} from '..//firebase/config'


export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

   

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) =>{

        checkIfIsCancelled()
        setLoading(true)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            return user
            
        } catch (error) {

            console.log(error.message);
            console.log(typeof error.message);
            
        }

        setLoading(false)

    }

    useEffect(() => {
      return ()=> setCancelled(true)
    }, [])
    

    return{auth, createUser, loading, error}

}