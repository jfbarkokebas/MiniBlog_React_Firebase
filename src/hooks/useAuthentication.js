import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    FacebookAuthProvider
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '..//firebase/config'


export const useAuthentication = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)



    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {

        checkIfIsCancelled()
        setLoading(true)
        setError('')

        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(
                user => updateProfile(user, {
                    displayName: data.displayName
                })
            )
            .catch(
                error => {
                    console.log(error.message);
                    console.log(typeof error.message)

                    let systemError

                    if (error.message.includes('Password')) {

                        systemError = "A senha precisa ter no mínimo 6 caracteres"

                    } else if (error.message.includes('auth/email-already-in-use')) {

                        systemError = 'Usuário já cadastrado'

                    } else {
                        systemError = "Ocorreu um error, por favor tente mais tarde."
                    }
                    setError(systemError)
                }
            )

        /* try {
 
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
             
         }*/

        setLoading(false)
        setError('')

    }

    function logout() {
        checkIfIsCancelled()

        signOut(auth)
    }

    async function login(data) {
        checkIfIsCancelled()
        setError('')
        setLoading(true)

        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then(setLoading(false))
            .catch(
                error => {
                    
                    let systemError

                    if (error.message.includes('auth/user-not-found')) {
                        systemError = 'Usuário não encontrado!'

                    }else if(error.message.includes('auth/wrong-password')){
                        systemError = 'Senha incorreta!'
                    }

                    setLoading(false)
                    setError(systemError)
                    
                }
            )
    }
    console.log(error);
    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    return { auth, createUser, loading, error, logout, login }

}