import { useState, useEffect, useReducer } from 'react'
//firebase
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }
        case "DELETED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payLoad }
        default:
            return state

    }

}

export const useDeleteDocument = (docColection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState)

    const [cancelled, setCancelled] = useState(false)
    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteDocument = async (id) => {

        checkCancelledBeforeDispatch({
            type: 'LOADING',
            
        })

        try {

         const deletedDoc = await deleteDoc(doc(db,docColection, id))

            checkCancelledBeforeDispatch({
                type: 'DELETED_DOC',
                payLoad: deletedDoc
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
    

    return { deleteDocument, response }

}



