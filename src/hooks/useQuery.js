import { useLocation } from "react-router-dom";
import {useMemo} from 'react'

export function useQuery(){

    const {search} = useLocation() //pega os parametros da url da pagina quando é carregada
    
    return useMemo(()=> new URLSearchParams(search), [search])
}