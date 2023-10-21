import {createContext, ReactNode, useState} from 'react'
import api from '../services/api'
import { saveAuthToken } from '../Storage/saveAuthToken'
import { AxiosError } from 'axios'
import { AppError } from '../utils/AppErros'

interface AuthContextProviderProps {
    children: ReactNode
}

interface UserProps {
    id: string
    email: string
}

interface AuthContextProps {
    user:  UserProps| undefined,
    signIn: (credentials: SignInCredentials) => Promise<void>
}

interface SignInCredentials {
    email: string
    password: string
}

interface SignInResponse {
    token: string
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({children}: AuthContextProviderProps){
    
    function saveToken(token: string){
        saveAuthToken(token)
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    async function signIn( {email, password}: SignInCredentials){
        try {
            const response = await api.post<SignInResponse>('/auth/login',{
                email,
                password,
            })
            console.log(response.data)
            saveToken(response.data.token)
            
        } catch (error: any) {
            const isAxiosError = error instanceof AxiosError

            if(isAxiosError){
                 throw new AppError(error.response?.data.message, error.status)
            }

            throw new Error(error)
        }
    }



    return (
        <AuthContext.Provider value={{user: undefined,signIn}}>
            {children}
        </AuthContext.Provider>
    )
}