import { useState, useEffect, useReducer } from 'react'
//firebase
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payLoad }
        default:
            return state

    }

}

export const useInsertDocument = (docColection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState)

    const [cancelled, setCancelled] = useState(false)
    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {

        checkCancelledBeforeDispatch({
            type: 'LOADING',
            
        })

        try {

            const newDocument = { ...document, createdAt: Timestamp.now() }

            const docRef = collection(db, docColection)
            const insertedDocument = await addDoc(docRef, newDocument)

            checkCancelledBeforeDispatch({
                type: 'INSERTED_DOC',
                payLoad: insertedDocument
            })

        } catch (error) {

            checkCancelledBeforeDispatch({
                type: 'ERROR',
                payLoad: error.message
            })

        }


    }

    useEffect(() => {    
        setCancelled(true)    
    }, [])
    

    return { insertDocument, response }

}


