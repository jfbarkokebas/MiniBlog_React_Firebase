import { useState, useEffect, useReducer } from 'react'
//firebase
import { updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase/config'

const initialState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }
        case "UPDATED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payLoad }
        default:
            return state

    }

}

export const useUpdateDocument = (docColection) => {

    const [response, dispatch] = useReducer(updateReducer, initialState)

    const [cancelled, setCancelled] = useState(false)
    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const updateDocument = async (id, data) => { //uid??

        checkCancelledBeforeDispatch({
            type: 'LOADING',
            
        })

        try {

            const docRef = await doc(db, docColection,id)

            const updatedDocument = await updateDoc(docRef, data)


            checkCancelledBeforeDispatch({
                type: 'UPDATED_DOC',
                payLoad: updatedDocument
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
    

    return { updateDocument, response }

}


