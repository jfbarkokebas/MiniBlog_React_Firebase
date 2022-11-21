import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export function useFetchDocument(docCollection, id) {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(null)

    useEffect(() => {

        async function loadDocument() {
            if (cancelled) return

            setLoading(true)

            const docRef = doc(db, docCollection, id)
            await getDoc(docRef)
                .then(
                    snapshot => {
                        setDocument(snapshot.data())
                        setLoading(false)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                        setError(error.message)
                        setLoading(false)
                    }
                )


        }

        loadDocument()

    }, [docCollection, id, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { document, loading, error }

}