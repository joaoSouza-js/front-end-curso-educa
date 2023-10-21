
import { Button } from "../components/Button";
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom";
import LogoImage from '../assets/pinguin.svg'
import { useAuth } from "../hooks/useAuth";
import { AppError } from "../utils/AppErros";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

const SignInSchema = z.object({
    email: z.string({ required_error: "Digite o seu Email" }).email("O email não é valido"),
    password: z.string({ required_error: "Digite o a sua senha" }).min(6, 'A senha deve conter no minimo 6 caracteres').transform(password => password.trim())
})

type SignInSchemaType = z.infer<typeof SignInSchema>

export function SignIn() {
    const navigate = useNavigate()
    const { signIn } = useAuth()
    const { handleSubmit, formState, register } = useForm<SignInSchemaType>({
        resolver: zodResolver(SignInSchema)
    })
    const { isSubmitting, errors } = formState

    async function handleSignIn(formData: SignInSchemaType) {

        try {
            const { email, password } = formData
            await signIn({
                email: email,
                password: password
            })
            navigate("/home");

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
                    <img src={LogoImage} />

                </header>
                <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-1 gap-y-4 flex-col">
                    <TextInput.Root>
                        <TextInput.Input
                            placeholder="sueemail@gmail.com"
                            type="email"

                            {...register('email')}
                        />
                        {errors.email && <TextInput.Error>{errors.email.message}</TextInput.Error>}
                    </TextInput.Root>

                    <TextInput.Root >
                        <TextInput.Password
                            placeholder="sua senha*****"
                            {...register('password')}
                        />
                        {errors.password && <TextInput.Error>{errors.password.message}</TextInput.Error>}

                    </TextInput.Root>
                    <Button disabled={isSubmitting}>Entrar</Button>

                </form>
            </div>
        </div>

    )
}