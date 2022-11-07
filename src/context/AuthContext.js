import { useContext, createContext } from "react";
/*
export const AuthContext = createContext({})

const AuthProvider = ({children})=>{

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
*/

const AuthContext = createContext()

export function AuthProvider({children, value}){

    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}

export function useAuthValue(){
    return useContext(AuthContext)
}

