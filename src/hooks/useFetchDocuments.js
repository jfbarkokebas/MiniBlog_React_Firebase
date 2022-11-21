import { useState, useEffect} from 'react'
import { db } from '../firebase/config'
import {getDocs, query, collection, onSnapshot, orderBy, where} from 'firebase/firestore'

export function useFetchDocuments(docCollection, search = null, uid= null){

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(null)
    
    useEffect(()=>{

        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try{

                let q

                if(search){

                q = query(collectionRef, where('tagsArray', 'array-contains', search), orderBy("createdAt", "desc"))
                    //faz uma busca nas tags, como é um array, o firebase tem o parametro 'array-contains'
                }else if(uid){

                    q = query(
                        collectionRef, 
                        where('uid', '==', uid), 
                        orderBy("createdAt", "desc"))

                }else{

                q = query(collectionRef, orderBy("createdAt", "desc"))

                }

                onSnapshot(q, (querySnapshot)=>{

                    setDocuments(
                        querySnapshot.docs.map( doc =>({
                            id: doc.id,
                            ...doc.data(),
    
                        }))
                    )
                })

                setLoading(false)
                
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()

    },[docCollection, search, uid, cancelled])

    useEffect(()=>{
        return ()=> setCancelled(true)
    },[])

    return {documents, loading, error}

}