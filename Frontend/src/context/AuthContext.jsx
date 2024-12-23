import { createContext, useContext, useEffect, useState } from "react"
import { useAxios } from "../hooks/UseAxios"

export const AuthContext = createContext(undefined)

export  const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth no esta dentro del contexto")
    }
    return context
}

export const AuthProvider = ({children}) =>{ 

    const {fetchData, loading, error, setLoading} = useAxios()

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null)

    const signUp = async(user) =>{
        await fetchData({
            url: '/auth/register',
            method: 'post',
            data: user,
        })
    }

    const signIn = async(user) =>{
        const res = await fetchData({
            url: '/auth/login',
            method: 'post',
            data: user,
        })
        setUser(res)
        setAuthenticated(true)
        localStorage.setItem('session_username', res.username);
    }

    const logout = async () => {
        await fetchData({
            url: '/auth/logout',
            method: 'post',
        });

        setUser(null)
        localStorage.removeItem('session_username');
        setAuthenticated(false)
    }

    const checkLogin = async () => {
        const storedUsername = localStorage.getItem('session_username');
        if (storedUsername) {
            try {
                const res = await fetchData({
                    url: '/user/getUser',
                    method: 'get',
                });
                if (!res) {
                    setAuthenticated(false);
                    localStorage.removeItem('session_username');
                } else {
                    setAuthenticated(true);
                    setUser(res);
                }
            } catch (error) {
                setAuthenticated(false);
                setUser(null);
                localStorage.removeItem('session_username');
                setLoading(false)
            }
        } else {
            setAuthenticated(false);
            setUser(null);
            setLoading(false)
        }
    }

    //trae los datos del usuario
    useEffect(() => {
        checkLogin();
    }, []);

    return(
        <AuthContext.Provider value={{ loading, error, isAuthenticated, user, signUp, signIn, logout}}>
            {children}
        </AuthContext.Provider>
    )
}