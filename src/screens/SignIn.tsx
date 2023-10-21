import { FormEvent } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom";
import LogoImage from '../assets/pinguin.svg'
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppErros";

export function SignIn(){
    const {signIn} = useAuth()

     async function handleSignIn(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        try {     
            await signIn({
                email: "Hazle12@hotmail.com",
                password: "W_Fa28_GNAa6Ft8"
            })
        } catch (error) {
            const isApexError = error instanceof AppError
            window.alert(isApexError ? error.message : "Erro no Servidor")
        }
     }
    return (
    <div className="min-h-screen flex justify-center items-center px-8">
        <div className="py-8 px-8 flex flex-col gap-y-4 shadow-3xl rounded-lg w-[22.1875rem]">
            <header className="flex justify-center gap-x-4 ">
                <h1 className="text-2xl font-medium text-center text-white">QUICK POST </h1>
                <img src={LogoImage}/>

            </header>
            <form onSubmit={handleSignIn} className="flex flex-1 gap-y-4 flex-col">
                <TextInput.Root>
                    <TextInput.Input placeholder="sueemail@gmail.com" type="email"/>
                </TextInput.Root>

                <TextInput.Root >
                 <TextInput.Password  placeholder="sua senha*****" type="email"/>
                </TextInput.Root>
                <Button>Entrar</Button>

            </form>
        </div>
    </div>

    )
}